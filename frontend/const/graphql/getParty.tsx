import { gql } from '@apollo/client';

const getParty = gql`query getParty(
  $id: String!
) {
 getParty(
  id: $id
  ) {
    id
    title
    description
    location
    date
  }
}`

export default getParty
