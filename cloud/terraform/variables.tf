variable "environment" {
  description = "Environment name (e.g., production, staging)"
  type        = string
  default     = "production"
}

variable "domain_name" {
  description = "Primary domain for the landing page (e.g. testmachine.ai). www subdomain is added automatically."
  type        = string
}

variable "staging_domain_name" {
  description = "Domain for the staging environment (e.g. staging.testmachine.ai)."
  type        = string
}

variable "staging_basic_auth_token" {
  description = "Base64-encoded 'username:password' for staging basic auth. Generate with: echo -n 'user:pass' | base64"
  type        = string
  sensitive   = true
}
