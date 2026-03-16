output "s3_bucket_name" {
  description = "S3 bucket holding the static site assets — set as LANDING_BUCKET repo variable in GitHub"
  value       = aws_s3_bucket.landing.bucket
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID — set as LANDING_CLOUDFRONT_ID repo variable in GitHub"
  value       = aws_cloudfront_distribution.landing.id
}

output "cloudfront_domain_name" {
  description = "CloudFront domain to CNAME from your apex / www records in Cloudflare"
  value       = aws_cloudfront_distribution.landing.domain_name
}

output "github_actions_role_arn" {
  description = "IAM role ARN for GitHub Actions OIDC — set as AWS_ROLE_ARN repo secret in GitHub"
  value       = aws_iam_role.github_actions.arn
}

output "acm_certificate_validation_options" {
  description = "DNS CNAME records to add to Cloudflare to validate the ACM certificate"
  value = {
    for dvo in aws_acm_certificate.landing.domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }
}

# ---------------------------------------------------------------------------
# Staging outputs
# ---------------------------------------------------------------------------
output "staging_s3_bucket_name" {
  description = "Staging S3 bucket — set as LANDING_STAGING_BUCKET repo variable in GitHub"
  value       = aws_s3_bucket.landing_staging.bucket
}

output "staging_cloudfront_distribution_id" {
  description = "Staging CloudFront distribution ID — set as LANDING_STAGING_CLOUDFRONT_ID repo variable in GitHub"
  value       = aws_cloudfront_distribution.landing_staging.id
}

output "staging_cloudfront_domain_name" {
  description = "Staging CloudFront domain — CNAME staging_domain_name to this in Cloudflare"
  value       = aws_cloudfront_distribution.landing_staging.domain_name
}

output "staging_github_actions_role_arn" {
  description = "Staging IAM role ARN for GitHub Actions OIDC — set as AWS_STAGING_ROLE_ARN repo secret in GitHub"
  value       = aws_iam_role.github_actions_staging.arn
}

output "acm_certificate_validation_options_staging" {
  description = "DNS CNAME records to add to Cloudflare to validate the staging ACM certificate"
  value = {
    for dvo in aws_acm_certificate.landing_staging.domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }
}
