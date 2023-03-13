import * as cdk from 'aws-cdk-lib';
import { ALBPublicSubnetStack } from '../../stack/albPublicSubnetStack';

export class APNorthEast2 {
  static albPublicSubnet(app: cdk.App, props: cdk.StackProps): void {
    new ALBPublicSubnetStack(app, 'ALBPublicSubnetStack', props);
  }
}
