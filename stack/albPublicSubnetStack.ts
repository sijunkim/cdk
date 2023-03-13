import { Construct } from 'constructs';
import * as env from '../utilities/env';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { vpcModule, ecrModule } from '../service/serviceModule';

export class ALBPublicSubnetStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC, Public Subnet 2개
    const publicSubnetConfig1 = vpcModule.getPublicSubnet(env.CDK_PUBLIC_SUBNET1);
    const publicSubnetConfig2 = vpcModule.getPublicSubnet(env.CDK_PUBLIC_SUBNET2);
    const vpcProps = vpcModule.getVPC(env.CDK_VPC, [publicSubnetConfig1, publicSubnetConfig2]);
    const vpc = new ec2.Vpc(this, id, vpcProps);

    // ECR
    const repositoryProps = ecrModule.getRepository(env.CDK_REPOSITORY);
    const erc = new ecr.Repository(this, id, repositoryProps);
  }
}
