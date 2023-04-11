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
