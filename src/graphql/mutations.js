import { gql } from '@apollo/client';


export const LOGIN_MUTATION = gql`
  mutation tokenAuth(
    $username: String!
    $password: String!
  ) {
    tokenAuth(
      username: $username
      password: $password
    ) {
      token
    }
  }
`;


export const SIGNUP_MUTATION = gql`
  mutation signUp(
    $username: String!
    $password: String!
    $password2: String!
  ) {
    signUp(
      username: $username
      password: $password
      password2: $password2
    ) {
      user {
        id
        username
      }
      token
    }
  }
`;