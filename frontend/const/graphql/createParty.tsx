import { gql } from '@apollo/client';

const createParty = gql`mutation createParty(
  $title: String
  $description: String
  $location: String
  $date: String
) {
 createParty(
  title: $title
  description: $description
  location: $location
  date: $date
  ) {
    id
  }
}`

export default createParty
