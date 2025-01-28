import os

class AWSConfig:
    REGION = os.getenv('AWS_REGION', 'us-east-1')
    SECRET_ARN = os.getenv('AWS_SECRET_ARN')
    DB_INSTANCE_NAME = os.getenv('DB_INSTANCE_NAME')