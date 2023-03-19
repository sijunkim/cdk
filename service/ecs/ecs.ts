import { Construct } from 'constructs';
import * as env from '../../utilities/env';
import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

export function getCluster(clusterName: string, vpc: ec2.Vpc): ecs.ClusterProps {
  return {
    clusterName,
    vpc,
  };
}

export function getTaskDefinition(family: string, taskRole: iam.IRole, executionRole: iam.IRole): ecs.TaskDefinitionProps {
  return {
    family,
    memoryMiB: '2048',
    cpu: '1024',
    compatibility: ecs.Compatibility.FARGATE,
    taskRole,
    executionRole,
  };
}

export function getContainerDefinition(repository: ecr.IRepository): ecs.ContainerDefinitionOptions {
  return {
    image: ecs.ContainerImage.fromEcrRepository(repository),
    // secrets manager 연동
    // secrets: {},
    // OpenSearch 연동
    // logging: ecs.LogDrivers.firelens({
    //   options: {

    //   }
    // },
  };
}

// Secrets Manager
// arn:aws:secretsmanager:<region>:<aws_account_id>:secret:<secret_name>
// arn:aws:secretsmanager:ap-northeast-2:145767916253:secret:ADMIN_SECRETS-rSwZrk
// arn:aws:secretsmanager:ap-northeast-2:145767916253:secret:ADMIN_SECRETS-rSwZrk:ETHERSCAN_API_KEY::
// const secretCompleteArn = 'arn:aws:secretsmanager:ap-northeast-2:{aws accounts id}:secret:BATCH_SECRETS-6b9Bhb';
// const mySecretFromCompleteArn = ecs.Secret.fromSecretsManager(secretCompleteArn, 'SecretFromCompleteArn');
