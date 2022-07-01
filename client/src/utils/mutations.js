import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FOOD = gql`
  mutation addFood($foodName: String!, $expiration: String!, $quantity: Int!) {

    addFood(foodName: $foodName, expiration: $expiration, quantity:$quantity) {
      _id
      foodName
      expiration
      quantity
      }
  }
`;

export const REMOVE_FOOD = gql`
  mutation removeFood($id: ID!) {
    removeFood(id: $id) {
      _id
      foodName
      expiration
      quantity
      }
    }
`;
