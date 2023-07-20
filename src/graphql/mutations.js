import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
  mutation CreateAccout (
    $name: String!
    $email: String!
    $password: String!
  ) {
    createAccount (
      name: $name
      email: $email
      password: $password
    ) {
      token
      message
    }
  }
`;

export const LOGIN = gql`
  mutation AuthLogin (
    $email: String!
    $password: String!
  ) {
    authLogin (
      email: $email
      password: $password
    ) {
      token
      message
        user {
        name
        email
        _id
      }
    }
  }
`;