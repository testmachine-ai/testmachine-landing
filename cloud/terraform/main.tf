terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    bucket         = "testmachine.ai.eks-terraform-state-bucket"
    key            = "testmachine-landing/terraform.tfstate"
    region         = "us-east-2"
    dynamodb_table = "eks-terraform-state-lock-table"
  }
}

provider "aws" {
  region = "us-east-2"
}

# ACM certificates for CloudFront must be provisioned in us-east-1
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

# ---------------------------------------------------------------------------
# ACM Certificate
#
# Two-step apply required for first-time setup:
#
#   1. terraform apply -target=aws_acm_certificate.landing
#   2. terraform output acm_certificate_validation_options
#      → add the DNS CNAME records to Cloudflare
#   3. terraform apply   (continues once ACM confirms validation)
# ---------------------------------------------------------------------------
resource "aws_acm_certificate" "landing" {
  provider                  = aws.us_east_1
  domain_name               = var.domain_name
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    "Project"     = "testmachine-landing"
    "Terraform"   = "true"
    "Environment" = var.environment
  }
}

# Waits until ACM confirms the certificate is issued.
# terraform apply will block here until DNS validation propagates.
resource "aws_acm_certificate_validation" "landing" {
  provider        = aws.us_east_1
  certificate_arn = aws_acm_certificate.landing.arn

  validation_record_fqdns = [
    for dvo in aws_acm_certificate.landing.domain_validation_options : dvo.resource_record_name
  ]
}

# ---------------------------------------------------------------------------
# S3 Bucket (private — served exclusively via CloudFront OAC)
# ---------------------------------------------------------------------------
resource "aws_s3_bucket" "landing" {
  bucket = "testmachine-landing-${var.environment}"

  tags = {
    "Project"     = "testmachine-landing"
    "Terraform"   = "true"
    "Environment" = var.environment
  }
}

resource "aws_s3_bucket_public_access_block" "landing" {
  bucket = aws_s3_bucket.landing.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ---------------------------------------------------------------------------
# CloudFront Origin Access Control
# ---------------------------------------------------------------------------
resource "aws_cloudfront_origin_access_control" "landing" {
  name                              = "testmachine-landing-${var.environment}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# Bucket policy granting CloudFront OAC read access
resource "aws_s3_bucket_policy" "landing" {
  bucket = aws_s3_bucket.landing.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipal"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.landing.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.landing.arn
          }
        }
      }
    ]
  })
}

# ---------------------------------------------------------------------------
# CloudFront Function — URL rewrite for static site serving
#
# adapter-static (trailingSlash: 'always') outputs directory index files:
#   /blog/                        →  blog/index.html
#   /blog/coinbase-dex-expansion/ →  blog/coinbase-dex-expansion/index.html
#
# S3 via OAC serves exact key matches only, so this function rewrites
# extensionless paths to their index.html equivalent.
# ---------------------------------------------------------------------------
resource "aws_cloudfront_function" "url_rewrite" {
  name    = "testmachine-landing-url-rewrite-${var.environment}"
  runtime = "cloudfront-js-2.0"
  publish = true

  code = <<-EOT
    function handler(event) {
      var request = event.request;
      var uri = request.uri;

      // Pass through requests with a file extension unchanged
      if (uri.includes('.')) {
        return request;
      }

      // Normalise to trailing slash then resolve to index.html
      if (!uri.endsWith('/')) {
        uri = uri + '/';
      }
      request.uri = uri + 'index.html';

      return request;
    }
  EOT
}

# ---------------------------------------------------------------------------
# CloudFront Distribution
# ---------------------------------------------------------------------------
resource "aws_cloudfront_distribution" "landing" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  comment             = "testmachine-landing ${var.environment}"
  price_class         = "PriceClass_All"

  aliases = [var.domain_name, "www.${var.domain_name}"]

  origin {
    domain_name              = aws_s3_bucket.landing.bucket_regional_domain_name
    origin_id                = "s3-testmachine-landing"
    origin_access_control_id = aws_cloudfront_origin_access_control.landing.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "s3-testmachine-landing"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    # AWS managed CachingOptimized policy: MinTTL=1, DefaultTTL=86400,
    # MaxTTL=31536000. Respects origin Cache-Control headers, so immutable
    # assets cache for 1 year and HTML (max-age=0) revalidates every request.
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.url_rewrite.arn
    }
  }

  # S3 returns 403 (not 404) for objects missing behind OAC.
  # Both are mapped to 404.html (the SvelteKit fallback / error page).
  custom_error_response {
    error_code         = 403
    response_code      = 404
    response_page_path = "/404.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 404
    response_page_path = "/404.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    # References the validation resource so Terraform waits for issuance
    acm_certificate_arn      = aws_acm_certificate_validation.landing.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = {
    "Project"     = "testmachine-landing"
    "Terraform"   = "true"
    "Environment" = var.environment
  }
}

# ---------------------------------------------------------------------------
# GitHub Actions OIDC — keyless auth for CI/CD
#
# If this provider already exists in the account (e.g. created by another
# repo's Terraform), import it rather than creating a duplicate:
#
#   terraform import aws_iam_openid_connect_provider.github \
#     arn:aws:iam::317478300416:oidc-provider/token.actions.githubusercontent.com
# ---------------------------------------------------------------------------
resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]

  tags = {
    "Project"   = "testmachine-landing"
    "Terraform" = "true"
  }
}

resource "aws_iam_role" "github_actions" {
  name = "testmachine-landing-github-actions-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:testmachine-ai/testmachine-landing:*"
          }
        }
      }
    ]
  })

  tags = {
    "Project"     = "testmachine-landing"
    "Terraform"   = "true"
    "Environment" = var.environment
  }
}

resource "aws_iam_role_policy" "github_actions" {
  name = "testmachine-landing-deploy"
  role = aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "S3Deploy"
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.landing.arn,
          "${aws_s3_bucket.landing.arn}/*"
        ]
      },
      {
        Sid      = "CloudFrontInvalidate"
        Effect   = "Allow"
        Action   = "cloudfront:CreateInvalidation"
        Resource = aws_cloudfront_distribution.landing.arn
      }
    ]
  })
}

# ===========================================================================
# STAGING
#
# Access control: HTTP Basic Auth via CloudFront Function.
#
# Background: the VPN uses split-tunnel routing — only traffic destined for
# the VPC CIDR (10.0.0.0/16) goes through the tunnel. CloudFront is a public
# AWS service outside the VPC, so the ALB security-group pattern used by the
# EKS services (allow 10.60.0.0/16) cannot be applied here. Basic auth on the
# CloudFront Function is the standard equivalent for static-site staging.
#
# Two-step apply required for first-time setup (same as production):
#
#   1. terraform apply -target=aws_acm_certificate.landing_staging
#   2. terraform output acm_certificate_validation_options_staging
#      → add the CNAME records to Cloudflare
#   3. terraform apply
# ===========================================================================

resource "aws_acm_certificate" "landing_staging" {
  provider          = aws.us_east_1
  domain_name       = var.staging_domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    "Project"     = "testmachine-landing"
    "Terraform"   = "true"
    "Environment" = "staging"
  }
}

resource "aws_acm_certificate_validation" "landing_staging" {
  provider        = aws.us_east_1
  certificate_arn = aws_acm_certificate.landing_staging.arn

  validation_record_fqdns = [
    for dvo in aws_acm_certificate.landing_staging.domain_validation_options : dvo.resource_record_name
  ]
}

resource "aws_s3_bucket" "landing_staging" {
  bucket = "testmachine-landing-staging"

  tags = {
    "Project"     = "testmachine-landing"
    "Terraform"   = "true"
    "Environment" = "staging"
  }
}

resource "aws_s3_bucket_public_access_block" "landing_staging" {
  bucket = aws_s3_bucket.landing_staging.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_cloudfront_origin_access_control" "landing_staging" {
  name                              = "testmachine-landing-staging"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_s3_bucket_policy" "landing_staging" {
  bucket = aws_s3_bucket.landing_staging.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipal"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.landing_staging.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.landing_staging.arn
          }
        }
      }
    ]
  })
}

# ---------------------------------------------------------------------------
# CloudFront Function — Basic Auth + URL rewrite (staging only)
#
# CloudFront supports one viewer-request function per distribution, so both
# concerns are combined here. The basic auth token is the base64 encoding of
# "username:password" — pass it as var.staging_basic_auth_token.
# ---------------------------------------------------------------------------
resource "aws_cloudfront_function" "staging_viewer_request" {
  name    = "testmachine-landing-staging-viewer-request"
  runtime = "cloudfront-js-2.0"
  publish = true

  code = <<-EOT
    function handler(event) {
      var request = event.request;
      var headers = request.headers;

      // Basic auth — reject unauthenticated requests
      var authHeader = headers.authorization;
      if (!authHeader || authHeader.value !== 'Basic ${var.staging_basic_auth_token}') {
        return {
          statusCode: 401,
          statusDescription: 'Unauthorized',
          headers: {
            'www-authenticate': { value: 'Basic realm="TestMachine Staging"' },
            'cache-control': { value: 'no-store' }
          }
        };
      }

      // URL rewrite — resolve extensionless paths to index.html
      var uri = request.uri;
      if (!uri.includes('.')) {
        if (!uri.endsWith('/')) {
          uri = uri + '/';
        }
        request.uri = uri + 'index.html';
      }

      return request;
    }
  EOT
}

resource "aws_cloudfront_distribution" "landing_staging" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  comment             = "testmachine-landing staging"
  price_class         = "PriceClass_All"

  aliases = [var.staging_domain_name]

  origin {
    domain_name              = aws_s3_bucket.landing_staging.bucket_regional_domain_name
    origin_id                = "s3-testmachine-landing-staging"
    origin_access_control_id = aws_cloudfront_origin_access_control.landing_staging.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "s3-testmachine-landing-staging"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.staging_viewer_request.arn
    }
  }

  custom_error_response {
    error_code         = 403
    response_code      = 404
    response_page_path = "/404.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 404
    response_page_path = "/404.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.landing_staging.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = {
    "Project"     = "testmachine-landing"
    "Terraform"   = "true"
    "Environment" = "staging"
  }
}

# ---------------------------------------------------------------------------
# GitHub Actions IAM role — staging
# ---------------------------------------------------------------------------
resource "aws_iam_role" "github_actions_staging" {
  name = "testmachine-landing-github-actions-staging"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:testmachine-ai/testmachine-landing:*"
          }
        }
      }
    ]
  })

  tags = {
    "Project"     = "testmachine-landing"
    "Terraform"   = "true"
    "Environment" = "staging"
  }
}

resource "aws_iam_role_policy" "github_actions_staging" {
  name = "testmachine-landing-deploy-staging"
  role = aws_iam_role.github_actions_staging.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "S3Deploy"
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.landing_staging.arn,
          "${aws_s3_bucket.landing_staging.arn}/*"
        ]
      },
      {
        Sid      = "CloudFrontInvalidate"
        Effect   = "Allow"
        Action   = "cloudfront:CreateInvalidation"
        Resource = aws_cloudfront_distribution.landing_staging.arn
      }
    ]
  })
}
