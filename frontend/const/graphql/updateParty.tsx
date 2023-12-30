import { gql } from '@apollo/client';

const updateParty = gql`mutation updateParty(
  $id: String!
  $title: String
  $description: String
  $location: String
  $date: String
) {
 updateParty(
  id: $id
  title: $title
  description: $description
  location: $location
  date: $date
  ) {
    id
  }
}`

export default updateParty
