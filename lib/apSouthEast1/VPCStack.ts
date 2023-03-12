import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as env from '../../utilities/env';

export class VPCStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const publicSubnetConfig1: cdk.aws_ec2.SubnetConfiguration = {
      cidrMask: 24,
      mapPublicIpOnLaunch: true,
      name: env.CDK_PUBLIC_SUBNET1,
      subnetType: ec2.SubnetType.PUBLIC,
    };

    const publicSubnetConfig2: cdk.aws_ec2.SubnetConfiguration = {
      cidrMask: 24,
      mapPublicIpOnLaunch: true,
      name: env.CDK_PUBLIC_SUBNET2,
      subnetType: ec2.SubnetType.PUBLIC,
    };

    const privateSubnetConfig1: cdk.aws_ec2.SubnetConfiguration = {
      cidrMask: 24,
      mapPublicIpOnLaunch: false,
      name: env.CDK_PRIVATE_SUBNET1,
      subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
    };

    const privateSubnetConfig2: cdk.aws_ec2.SubnetConfiguration = {
      cidrMask: 24,
      mapPublicIpOnLaunch: false,
      name: env.CDK_PRIVATE_SUBNET2,
      subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
    };

    // VPC
    const vpcProps: cdk.aws_ec2.VpcProps = {
      vpcName: env.CDK_VPC,
      maxAzs: 2,
      subnetConfiguration: [publicSubnetConfig1, publicSubnetConfig2, privateSubnetConfig1, privateSubnetConfig2],
    };
    const vpc = new ec2.Vpc(this, env.CDK_VPC, vpcProps);
  }
}
