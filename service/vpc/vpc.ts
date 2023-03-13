import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { SubnetConfiguration } from 'aws-cdk-lib/aws-ec2';

export function getPublicSubnet(name: string): cdk.aws_ec2.SubnetConfiguration {
  return {
    cidrMask: 24,
    mapPublicIpOnLaunch: true,
    name,
    subnetType: ec2.SubnetType.PUBLIC,
  };
}

export function getPrivateSubnet(name: string): cdk.aws_ec2.SubnetConfiguration {
  return {
    cidrMask: 24,
    mapPublicIpOnLaunch: false,
    name,
    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
  };
}

export function getVPC(vpcName: string, subnetConfiguration: SubnetConfiguration[]): cdk.aws_ec2.VpcProps {
  return {
    vpcName,
    maxAzs: 2,
    subnetConfiguration,
  };
}
