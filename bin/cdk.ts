#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import * as env from '../utilities/env';
import * as apSouthEast1Module from '../lib/apSouthEast1/apSouthEast1Module';

const cdkEnvironment: cdk.Environment = { account: env.CDK_DEFAULT_ACCOUNT, region: env.CDK_DEFAULT_REGION };
const props: cdk.StackProps = { env: cdkEnvironment };
const app = new cdk.App();

// IAM Role
// new apSouthEast1Module.IAMStack(app, 'IAMStack', props);

// ECR Stack
new apSouthEast1Module.ECRStack(app, 'ECRStack', props);

// VPC Stack
new apSouthEast1Module.VPCStack(app, 'VPCStack', props);

// Cluster Stack
// new apSouthEast1Module.ClusterStack(app, env.CDK_CLUSTER, props);

// Task-Definition Stack
// new apSouthEast1Module.TaskDefinitionECSStack(app, 'TaskDefinitionECSStack', props);
