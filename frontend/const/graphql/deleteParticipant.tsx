import { gql } from '@apollo/client';

const deleteParticipant = gql`mutation deleteParticipant(
  $partyId: String!
  $id: String!
) {
 deleteParticipant(
  partyId: $partyId
  id: $id
  ) {
    id
  }
}`

export default deleteParticipant
