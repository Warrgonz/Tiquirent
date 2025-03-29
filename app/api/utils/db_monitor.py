import boto3
from datetime import datetime, timedelta
from config.aws_config import AWSConfig

class DBMonitor:
    @staticmethod
    def check_storage_usage():
        cloudwatch = boto3.client('cloudwatch', region_name=AWSConfig.REGION)
        
        response = cloudwatch.get_metric_statistics(
            Namespace='AWS/RDS',
            MetricName='FreeStorageSpace',
            Dimensions=[
                {
                    'Name': 'DBInstanceIdentifier',
                    'Value': AWSConfig.DB_INSTANCE_NAME
                },
            ],
            StartTime=datetime.utcnow() - timedelta(hours=1),
            EndTime=datetime.utcnow(),
            Period=300,
            Statistics=['Average']
        )
        
        if response['Datapoints']:
            free_space_gb = response['Datapoints'][0]['Average'] / (1024**3)
            return free_space_gb
        return None
    
    @staticmethod
    def check_aws_credentials():
        try:
        # Intentar obtener caller identity
            sts = boto3.client('sts')
            identity = sts.get_caller_identity()
            print(f"AWS Credentials OK - Account: {identity['Account']}")
            return True
        except Exception as e:
            print(f"AWS Credentials Error: {str(e)}")
        return False