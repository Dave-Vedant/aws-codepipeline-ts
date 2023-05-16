import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep, Step } from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './stage';

export class AwsCodepipelineTsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      synth: new ShellStep('Synth', {
        // source
        input: CodePipelineSource.gitHub('vedantdave77/aws-codepipeline-ts', 'main'), //Remember to change 
        // build
        commands: ['npm ci', 
                   'npm run build', 
                   'npx cdk synth']
      })
    });

    /*
    synth() --> it preform important tasks, and generate cloud formation template.
      - dependency resolution --> ensure required library and modules are installed
      - code generation --> analyze th app code, connstruct and configure the cloud formation template
      - validation --> validate code and configurations
      - output generation --> generate artifacts used further in deployment (cloud formation template)

    update pipeline() --> make changes to ci/cd processes, (define the yaml or json file)
     - addingn or removeing stages
     - modifyin the actions
     - adjusting the pipoene setting (name, artifact store, pipeline level configurationn)
     - updatingn pipeie execution order
    
     - self mutate (means self update)

    assets() --> used as custom stage
     -- operation related to static assets and binary files.
     - build or compilation
     - asset processing
     - artifact generation
     - asset validation

    */

    //testing stage (lambda stack.prepare --> (mypipeline--> stage---> lambda_stack))
    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: "398081196462", region: "ca-central-1" }
    }));

    // testing stage (unit test)
    testingStage.addPre(new ShellStep("Run Unit Tests", { commands: ['npm install', 'npm test'] }));
    // testing stage (manual approval)
    testingStage.addPost(new ManualApprovalStep('Manual approval before production'));

    // prod stage
    const prodStage = pipeline.addStage(new MyPipelineAppStage(this, "prod", {
      env: { account: "398081196462", region: "ca-central-1" }
    }));
  }
}