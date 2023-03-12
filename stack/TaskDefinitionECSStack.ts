import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as env from '../../utilities/env';

export class TaskDefinitionECSStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Task Definition
    const taskDefinitionProps = {
      family: env.CDK_TASK_DEFINITION,
      memoryMiB: '512',
      cpu: '256',
      compatibility: ecs.Compatibility.FARGATE,
    };
    const taskDefinition = new ecs.TaskDefinition(this, env.CDK_TASK_DEFINITION, taskDefinitionProps);
    const repository = ecr.Repository.fromRepositoryName(this, env.CDK_REPOSITORY, env.CDK_REPOSITORY);
    // const secretCompleteArn = 'arn:aws:secretsmanager:ap-northeast-2:{aws accounts id}:secret:BATCH_SECRETS-6b9Bhb';
    // const mySecretFromCompleteArn = secretsmanager.Secret.fromSecretCompleteArn(this, 'SecretFromCompleteArn', secretCompleteArn);
    const containerDefinitionOptions = {
      image: ecs.ContainerImage.fromEcrRepository(repository),
    };
    taskDefinition.addContainer(env.CDK_CONTAINER, containerDefinitionOptions);
  }
}
