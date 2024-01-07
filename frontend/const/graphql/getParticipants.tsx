import { gql } from '@apollo/client';

const createParty = gql`query getParticipants(
  $partyId: String!
  $limit: Int
  $nextToken: String
) {
 getParticipants(
  partyId: $partyId
  limit: $limit
  nextToken: $nextToken
  ) {
    items {
      id
      name
      email
      invitationSent
    }
    nextToken
  }
}`

export default createParty
