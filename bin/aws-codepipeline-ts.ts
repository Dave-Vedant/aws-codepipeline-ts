#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {AwsCodepipelineTsStack} from '../lib/aws-codepipeline-ts-stack';

const app = new cdk.App();
new AwsCodepipelineTsStack(app, 'AwsCodepipelineTsStack', {
  env: {
    account: '398081196462',
    region: 'ca-central-1'
  }
});

app.synth();

