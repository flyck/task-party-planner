/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation createParty(\n  $title: String\n  $description: String\n  $location: String\n  $date: String\n) {\n createParty(\n  title: $title\n  description: $description\n  location: $location\n  date: $date\n  ) {\n    id\n  }\n}": types.CreatePartyDocument,
    "mutation deleteParty(\n  $id: String!\n) {\n deleteParty(\n  id: $id\n  ) {\n    id\n  }\n}": types.DeletePartyDocument,
    "query getParty(\n  $id: String!\n) {\n getParty(\n  id: $id\n  ) {\n    id\n    title\n    description\n    location\n    date\n  }\n}": types.GetPartyDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createParty(\n  $title: String\n  $description: String\n  $location: String\n  $date: String\n) {\n createParty(\n  title: $title\n  description: $description\n  location: $location\n  date: $date\n  ) {\n    id\n  }\n}"): (typeof documents)["mutation createParty(\n  $title: String\n  $description: String\n  $location: String\n  $date: String\n) {\n createParty(\n  title: $title\n  description: $description\n  location: $location\n  date: $date\n  ) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation deleteParty(\n  $id: String!\n) {\n deleteParty(\n  id: $id\n  ) {\n    id\n  }\n}"): (typeof documents)["mutation deleteParty(\n  $id: String!\n) {\n deleteParty(\n  id: $id\n  ) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getParty(\n  $id: String!\n) {\n getParty(\n  id: $id\n  ) {\n    id\n    title\n    description\n    location\n    date\n  }\n}"): (typeof documents)["query getParty(\n  $id: String!\n) {\n getParty(\n  id: $id\n  ) {\n    id\n    title\n    description\n    location\n    date\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;