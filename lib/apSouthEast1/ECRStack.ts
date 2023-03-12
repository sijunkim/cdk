import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as env from '../../utilities/env';

export class ECRStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ECR
    const repositoryProps: cdk.aws_ecr.RepositoryProps = { repositoryName: env.CDK_REPOSITORY };
    const erc = new ecr.Repository(this, env.CDK_REPOSITORY, repositoryProps);
  }
}
