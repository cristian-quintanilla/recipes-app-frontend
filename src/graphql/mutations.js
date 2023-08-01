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

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword (
    $password: String
  ) {
    updatePassword (
      password: $password
    ) {
      password
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation {
    deleteAccount {
      message
    }
  }
`;

export const UPDATE_ACCOUNT = gql`
  mutation UpdateAccount (
    $name: String!
    $imageUrl: String
    $age: NonNegativeInt
    $favoriteRecipe: String
  ) {
    updateAccount (
      name: $name
      imageUrl: $imageUrl
      age: $age
      favoriteRecipe: $favoriteRecipe
    ) {
      age
      name
      favoriteRecipe
      imageUrl
    }
  }
`;
