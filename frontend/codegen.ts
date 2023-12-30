
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "../schema.graphql",
  documents: "const/graphql/*.tsx",
  generates: {
    "lib/gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
