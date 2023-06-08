import { gql } from '@apollo/client';

export const GET_RECIPES = gql`
  query GetRecipes {
    recipes (page: 1, size: 5) {
      description
      imageUrl
      name
      servings
      timeCooking
      timePreparation
      id
    }
  }
`;

export const GET_RECIPE = gql`
  query Recipe ($recipeId: ID!) {
    recipe (recipeId: $recipeId) {
      description
      id
      imageUrl
      name
      servings
      timeCooking
      timePreparation
      category {
        name
      }
      comments {
        comment
        date
        user {
          email
          imageUrl
          name
        }
      }
      ingredients {
        name
      }
      likes {
        date
        user {
          _id
          name
        }
      }
      steps {
        step
        description
      }
      user {
        email
        imageUrl
        name
      }
    }
  }
`;
