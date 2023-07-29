import { gql } from '@apollo/client';

export const GET_RECIPES = gql`
  query GetRecipes {
    recipes (page: 1, size: 5) {
      count
      recipes {
        description
        imageUrl
        name
        servings
        timeCooking
        timePreparation
        id
      }
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
      commentsCount
      likesCount
      userLiked
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

export const SEARCH_RECIPES = gql`
  query Recipes (
    $page: Int
    $size: Int
    $substring: String
  ) {
    recipes (
      page: $page
      size: $size
      substring: $substring
    ) {
      count
      recipes {
        description
        id
        imageUrl
        name
        servings
        timeCooking
        timePreparation
      }
    }
  }
`;

export const RENEW_TOKEN = gql`
  query {
    renewToken {
      token
      message
      user {
        _id
        name
        email
      }
    }
  }
`;

export const GET_MY_RECIPES = gql`
  query {
    getMe {
      recipes {
        description
        id
        imageUrl
        name
        servings
        timeCooking
        timePreparation
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser ($_id: ID!) {
    getUser (_id: $_id) {
      _id
      name
      age
      email
      imageUrl
      favoriteRecipe
      totalRecipes
    }
  }
`;

export const GET_ME = gql`
  query {
    getMe {
      age
      name
      favoriteRecipe
      imageUrl
    }
  }
`;
