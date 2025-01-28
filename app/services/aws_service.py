import boto3
from botocore.exceptions import ClientError
import json
import os

class AWSService:
    @staticmethod
    def get_secret():
        secret_name = os.getenv('AWS_SECRET_ARN')
        region_name = os.getenv('AWS_REGION', 'us-east-1')

        # Create a Secrets Manager client
        session = boto3.session.Session(
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
        )
        
        client = session.client(
            service_name='secretsmanager',
            region_name=region_name
        )

        try:
            get_secret_value_response = client.get_secret_value(
                SecretId=secret_name
            )
            # Parse the secret string from JSON
            secret = json.loads(get_secret_value_response['SecretString'])
            
            # Debug: print available keys (without values)
            print("Keys in secret:", list(secret.keys()))
            
            return secret

        except ClientError as e:
            print(f"Error getting secret: {str(e)}")
            raise