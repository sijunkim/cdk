#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import * as env from '../utilities/env';
import * as regionModule from '../region/regionModule';

const cdkEnvironment: cdk.Environment = { account: env.CDK_DEFAULT_ACCOUNT, region: env.CDK_DEFAULT_REGION };
const props: cdk.StackProps = { env: cdkEnvironment };
const app = new cdk.App();

regionModule.APSouthEast1.albPublicSubnet(app, 'ALBPublicSubnetStack', props);
// regionModule.APSouthEast1.nlbPrivateSubnet(app, 'NLBPrivateSubnetStack', props);
