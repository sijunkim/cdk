import { Construct } from 'constructs';
import * as env from '../utilities/env';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as secretsManager from 'aws-cdk-lib/aws-secretsmanager';
import * as serviceModule from '../service/serviceModule';

export class ALBPublicSubnetStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC, Public Subnet 2개
    const publicSubnetConfig1 = serviceModule.vpc.getPublicSubnet(env.CDK_PUBLIC_SUBNET1);
    const publicSubnetConfig2 = serviceModule.vpc.getPublicSubnet(env.CDK_PUBLIC_SUBNET2);
    const vpcProps = serviceModule.vpc.getVPC(env.CDK_VPC, [publicSubnetConfig1, publicSubnetConfig2]);
    const vpc = new ec2.Vpc(this, id, vpcProps);

    // ECR
    const repositoryProps = serviceModule.ecr.getRepository(env.CDK_REPOSITORY);
    const repository = new ecr.Repository(this, id, repositoryProps);

    // CLUSTER
    const cluster = new ecs.Cluster(this, id, { vpc });

    // Task Definition
    const taskDefinitionProps: ecs.TaskDefinitionProps = {
      family: env.CDK_TASK_DEFINITION,
      memoryMiB: '2048',
      cpu: '1024',
      compatibility: ecs.Compatibility.FARGATE,
      taskRole: iam.Role.fromRoleArn(this, id, env.CDK_ECS_TASK_EXECUTION_ROLE_ARN),
      executionRole: iam.Role.fromRoleArn(this, id, env.CDK_ECS_TASK_EXECUTION_ROLE_ARN),
    };
    // serviceModule.taskDefinition.getTaskDefinition(this, id, env.CDK_TASK_DEFINITION);
    const taskDefinition = new ecs.TaskDefinition(this, id, taskDefinitionProps);
    const containerDefinition = taskDefinition.addContainer(env.CDK_CONTAINER, {
      image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
      cpu: 1,
      memoryLimitMiB: 2048,
      // secrets manager 연동
      // secrets: {},
      // OpenSearch 연동
      // logging: ecs.LogDrivers.firelens({
      //   options: {

      //   }
      // },
    });
    containerDefinition.addPortMappings({
      containerPort: 8801,
      hostPort: 80,
      name: env.CDK_CONTAINER,
      protocol: ecs.Protocol.TCP,
      appProtocol: ecs.AppProtocol.http,
    });
    // const containerDefinitionOptions: ecs.ContainerDefinitionOptions = {
    //   image: ecs.ContainerImage.fromEcrRepository(repository),
    //   cpu: 1,
    //   memoryReservationMiB: 2048,

    // };

    // Secrets Manager
    // arn:aws:secretsmanager:<region>:<aws_account_id>:secret:<secret_name>
    // arn:aws:secretsmanager:ap-northeast-2:145767916253:secret:ADMIN_SECRETS-rSwZrk
    // arn:aws:secretsmanager:ap-northeast-2:145767916253:secret:ADMIN_SECRETS-rSwZrk:ETHERSCAN_API_KEY::
    // const secretCompleteArn = 'arn:aws:secretsmanager:ap-northeast-2:{aws accounts id}:secret:BATCH_SECRETS-6b9Bhb';
    // const mySecretFromCompleteArn = ecs.Secret.fromSecretsManager(secretCompleteArn, 'SecretFromCompleteArn');

    // ECS
  }
}
