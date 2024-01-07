import { gql } from '@apollo/client';

const getParticipant = gql`query getParticipant(
  $partyId: String!
  $id: String!
) {
 getParticipant(
  partyId: $partyId
  id: $id
  ) {
    name
    email
    invitationSent
  }
}`

export default getParticipant
