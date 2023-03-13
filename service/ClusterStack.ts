import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as env from '../utilities/env';

export class ClusterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC
    const vpcLookupOptions: cdk.aws_ec2.VpcLookupOptions = { vpcName: env.CDK_VPC };
    const vpc = ec2.Vpc.fromLookup(this, env.CDK_VPC, vpcLookupOptions);

    // CLUSTER
    const cluster = new ecs.Cluster(this, env.CDK_CLUSTER, { vpc });
  }
}
