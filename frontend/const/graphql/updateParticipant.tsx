import { gql } from '@apollo/client';

const updateParticipant = gql`mutation updateParticipant(
$args: UpdateParticipantInput!
) {
 updateParticipant(
  args: $args
  ) {
    id
  }
}`

export default updateParticipant
