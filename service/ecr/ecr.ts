import * as cdk from 'aws-cdk-lib';

export function getRepository(repositoryName: string): cdk.aws_ecr.RepositoryProps {
  return { repositoryName };
}
