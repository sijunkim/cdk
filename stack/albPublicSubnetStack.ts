import { Construct } from 'constructs';
import * as env from '../utilities/env';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as vpcModule from '../service/vpcModule';

export class ALBPublicSubnetStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC, Public Subnet 2개, ALB
    const publicSubnetConfig1 = vpcModule.getPublicSubnet(env.CDK_PUBLIC_SUBNET1);
    const publicSubnetConfig2 = vpcModule.getPublicSubnet(env.CDK_PUBLIC_SUBNET2);

    const vpcProps: cdk.aws_ec2.VpcProps = {
      vpcName: env.CDK_VPC,
      maxAzs: 2,
      subnetConfiguration: [publicSubnetConfig1, publicSubnetConfig2],
    };
    const vpc = new ec2.Vpc(this, env.CDK_VPC, vpcProps);
  }
}
