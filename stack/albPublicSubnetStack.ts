import { Construct } from 'constructs';
import * as env from '../utilities/env';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as iam from 'aws-cdk-lib/aws-iam';
// import * as secretsManager from 'aws-cdk-lib/aws-secretsmanager';
import * as serviceModule from '../service/serviceModule';

export class ALBPublicSubnetStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC, Public Subnet 2개
    const publicSubnetConfig1 = serviceModule.vpc.getPublicSubnet(env.CDK_PUBLIC_SUBNET1);
    const publicSubnetConfig2 = serviceModule.vpc.getPublicSubnet(env.CDK_PUBLIC_SUBNET2);
    const vpcProps = serviceModule.vpc.getVPC(env.CDK_VPC, [publicSubnetConfig1, publicSubnetConfig2]);
    const vpc = new ec2.Vpc(this, env.CDK_VPC, vpcProps);

    // ECR
    const repositoryProps = serviceModule.ecr.getRepository(env.CDK_REPOSITORY);
    const repository = new ecr.Repository(this, env.CDK_REPOSITORY, repositoryProps);

    // CLUSTER
    const clusterProps = serviceModule.ecs.getCluster(env.CDK_CLUSTER, vpc);
    const cluster = new ecs.Cluster(this, env.CDK_CLUSTER, clusterProps);

    // IAM
    const taskRole = iam.Role.fromRoleArn(this, env.CDK_TASK_ROLE, env.CDK_ECS_TASK_EXECUTION_ROLE_ARN);
    const executionRole = iam.Role.fromRoleArn(this, env.CDK_EXECUTION_ROLE, env.CDK_ECS_TASK_EXECUTION_ROLE_ARN);

    // Task Definition
    const taskDefinitionProps = serviceModule.ecs.getTaskDefinition(env.CDK_TASK_DEFINITION, taskRole, executionRole);
    const taskDefinition = new ecs.TaskDefinition(this, env.CDK_TASK_DEFINITION, taskDefinitionProps);
    const containerDefinitionOptions = serviceModule.ecs.getContainerDefinition(repository);
    const containerDefinition = taskDefinition.addContainer(env.CDK_CONTAINER, containerDefinitionOptions);
    containerDefinition.addPortMappings({
      // hostPort: env.CDK_HOST_PORT,
      containerPort: env.CDK_CONTAINER_PORT,
      name: env.CDK_CONTAINER,
      protocol: ecs.Protocol.TCP,
      appProtocol: ecs.AppProtocol.http,
    });

    // ECS
  }
}
