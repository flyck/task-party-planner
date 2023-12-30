import { gql } from '@apollo/client';

const deleteParty = gql`mutation deleteParty(
  $id: String!
) {
 deleteParty(
  id: $id
  ) {
    id
  }
}`

export default deleteParty
