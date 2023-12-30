import { Stack, App } from 'aws-cdk-lib';
import { Node } from 'constructs';

export function getStringFromStageContext(
  ref: Stack | App | Node,
  name: string
) {
  const node: Node = 'node' in ref ? ref.node : ref;

  const stage = node.tryGetContext('stage');
  if (stage === undefined) {
    throw new Error(
      `Could not find stage in cdk context`
    );
  }
  const configMap = node.tryGetContext(stage);

  if (configMap === undefined) {
    throw new Error(
      `The stage ${stage} is not provided in cdk context`
    );
  }

  if (configMap[name] === undefined) {
    throw new Error(`${name} not provided in cdk context for stage ${stage}`);
  }
  return configMap[name];
}

export function getStringFromContext(ref: Stack | App | Node, name: string) {
  const node: Node = 'node' in ref ? ref.node : ref;
  const value = node.tryGetContext(name);

  if (value === undefined) {
    throw new Error(`${name} not provided in cdk context`);
  }
  return value;
}
