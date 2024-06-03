locals {
  common_tags = {
    terraform = "true"
    repo      = "https://github.com/lumbinigroupptyltd/web"
  }

}

module "frontend" {
  source   = "khimananda/frontend/aws"
  version = "1.0.4"
  bucket_name =  "new-dev.legalremit.com"
  domain      = "new-dev.legalremit.com"
  certificate = "arn:aws:acm:us-east-1:425124981474:certificate/9e652156-37c6-42d4-a549-2270ad5d800e"
}

output "distribution_id" {
  value = module.frontend.distribution_id
  description = "Cloudfront Distribution ID"
}

output "distribution_domain" {
  value = module.frontend.distribution_domain
  description = "Cloudfront Distribution ID"
}