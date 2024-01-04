import * as cdk from 'aws-cdk-lib';
import { StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import { join } from "path";
import { createPartyResolvers } from './backend-stack.parties';

interface MultiStackProps extends StackProps {
  projectName: string
}

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: MultiStackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const projectName = props.projectName

    const partyTable = new dynamodb.Table(this, 'parties', {
      tableName: `${projectName}-parties`,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true,
    });

    partyTable.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);

    const participantTable = new dynamodb.Table(this, 'participants', {
      tableName: `${projectName}-participants`,
      partitionKey: {
        name: 'partyId',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true,
    });

    partyTable.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);


    // AppSync API
    const api = new appsync.GraphqlApi(this, 'Api', {
      name: projectName,
      schema: appsync.SchemaFile.fromAsset(
        join(__dirname, '../../schema.graphql')
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
      xrayEnabled: true,
    });


    const partyDataSource = api.addDynamoDbDataSource('partyDataSource', partyTable);
    const noneDataSource = api.addNoneDataSource('None');

    createPartyResolvers(this, api, partyDataSource);
  }
}
