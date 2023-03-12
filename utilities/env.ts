import 'dotenv/config';

export const CDK_DEFAULT_ACCOUNT = <string>process.env.CDK_DEFAULT_ACCOUNT;
export const CDK_DEFAULT_REGION = <string>process.env.CDK_DEFAULT_REGION;

export const CDK_ROLE = <string>process.env.CDK_ROLE;
export const CDK_ROLE_ARN = <string>process.env.CDK_ROLE_ARN;
export const CDK_REPOSITORY = <string>process.env.CDK_REPOSITORY;
export const CDK_VPC = <string>process.env.CDK_VPC;
export const CDK_CLUSTER = <string>process.env.CDK_CLUSTER;
export const CDK_PUBLIC_SUBNET1 = <string>process.env.CDK_PUBLIC_SUBNET1;
export const CDK_PUBLIC_SUBNET2 = <string>process.env.CDK_PUBLIC_SUBNET2;
export const CDK_PRIVATE_SUBNET1 = <string>process.env.CDK_PRIVATE_SUBNET1;
export const CDK_PRIVATE_SUBNET2 = <string>process.env.CDK_PRIVATE_SUBNET2;
export const CDK_TASK_DEFINITION = <string>process.env.CDK_TASK_DEFINITION;
export const CDK_CONTAINER = <string>process.env.CDK_CONTAINER;
