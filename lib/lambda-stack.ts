import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, Runtime, Code, InlineCode } from 'aws-cdk-lib/aws-lambda';
import * as path from "path";


export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, StageName: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Lambda function
    new Function(this, 'LambdaFunction', {
      runtime: Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: Code.fromAsset(path.join(__dirname, 'lambda')),
      environment: {"stageName": StageName}
    });
  }
}
