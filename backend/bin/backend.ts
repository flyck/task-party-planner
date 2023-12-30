#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BackendStack } from '../lib/backend-stack';
import { getStringFromStageContext } from "../lib/utils"

const app = new cdk.App();

const env = {
  account: getStringFromStageContext(app.node, "account"),
  region: getStringFromStageContext(app.node, "region"),
};

const projectName = "party-task-planner";

new BackendStack(app, 'BackendStack', {
  env,
  projectName
});
