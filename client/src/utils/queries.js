import { gql } from '@apollo/client';

export const QUERY_FOODS = gql`
  query foods($foodName: String) {
    foods(foodName: $foodName) {
      _id
      foodName
      expiration
      quantity
    }
  }
`;

export const QUERY_FOOD = gql`
  query food($id: ID!) {
    food(_id: $id) {
      _id
      foodName
      expiration
      quantity
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      myFoods {
        _id
        foodName
        expiration
        quantity
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email 
      myFoods {
        _id
        foodName
        expiration
        quantity
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;
