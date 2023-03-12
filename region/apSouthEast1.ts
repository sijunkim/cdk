import * as cdk from 'aws-cdk-lib';
import { ALBPublicSubnetStack } from '../lib/albPublicSubnetStack';
import { NLBPrivateSubnetStack } from '../lib/nlbPrivateSubnetStack';

export class APSouthEast1 {
  static albPublicSubnet(app: cdk.App, id: string, props: cdk.StackProps): void {
    new ALBPublicSubnetStack(app, id, props);
  }

  static nlbPrivateSubnet(app: cdk.App, id: string, props: cdk.StackProps): void {
    new NLBPrivateSubnetStack(app, id, props);
  }
}
