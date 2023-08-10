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

export const LIKE_RECIPE = gql`
  mutation LikeRecipe($recipeId: ID!) {
    likeRecipe (recipeId: $recipeId) {
      id
    }
  }
`;

export const COMMENT_RECIPE = gql`
  mutation CommentRecipe (
    $recipeId: ID!
    $comment: String!
  ) {
    commentRecipe (
      recipeId: $recipeId
      comment: $comment
    ) {
      comment
      date
      user {
        email
        imageUrl
        name
      }
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation CreateRecipe (
    $name: String!
    $description: String!
    $timePreparation: String!
    $timeCooking: String!
    $servings: Int!
    $ingredients: [IngredientInput]!
    $steps: [StepInput]!
    $imageUrl: String
    $category: ID!
  ) {
    createRecipe (
      name: $name
      description: $description
      timePreparation: $timePreparation
      timeCooking: $timeCooking
      servings: $servings
      ingredients: $ingredients
      steps: $steps
      imageUrl: $imageUrl
      category: $category
    ) {
      name
    }
  }
`;
