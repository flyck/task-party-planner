import * as cdk from 'aws-cdk-lib';
import { StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import { join } from "path";

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

    partyDataSource.createResolver("createParty", {
      typeName: "Mutation",
      fieldName: "createParty",
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(join(__dirname, "./resolvers/createParty.js"))
    })

    partyDataSource.createResolver("getParty", {
      typeName: 'Query',
      fieldName: 'getParty',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbGetItem("id", "id"),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    // Make the update respect existing data. First resolver is a javascript resolver as well since
    // javascript resolvers and templates cannot be mixed within the same pipeline
    const UpdatePartyF1 = new appsync.AppsyncFunction(this, "updatePartyF1", {
      api,
      name: "UpdatePartyGet",
      dataSource: partyDataSource,
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(join(__dirname, "./resolvers/getParty.js")),
    })
    // cannot seem to run two operations in the same unit resolver even with javascript
    const UpdatePartyF2 = new appsync.AppsyncFunction(this, "updatePartyF2", {
      api,
      name: "UpdatePartyPut",
      dataSource: partyDataSource,
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(join(__dirname, "./resolvers/updateParty.js"))
    })
    new appsync.Resolver(this, "UpdatePipeline", {
      api,
      typeName: 'Mutation',
      fieldName: 'updateParty',
      pipelineConfig: [UpdatePartyF1, UpdatePartyF2],
      requestMappingTemplate: appsync.MappingTemplate.fromString('{}'),
      responseMappingTemplate: appsync.MappingTemplate.fromString('$util.toJson($ctx.result)'),
    })

    partyDataSource.createResolver("deleteParty", {
      typeName: 'Mutation',
      fieldName: 'deleteParty',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbDeleteItem("id", "id"),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });
  }
}
