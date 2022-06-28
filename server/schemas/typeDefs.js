const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }
    
    type Food {
        foodName: String
        expiration: String
        quantity: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addFood(foodName: String!, expriation: String!, quantity: Int!): Food
    }
`;

module.exports = typeDefs;