terraform {
  required_version = ">= 1.3 "
  backend "s3" {
    bucket = "lumbinigroup-tf-states"
    region = "us-east-1"
    key    = "frontend2.tfstate"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">=5.28"
    }
  }
}

provider "aws" {
  region = "ap-southeast-2"
}