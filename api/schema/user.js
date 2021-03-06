import { gql } from 'apollo-server-express';

export default gql`
  type Token {
      token: String!
   }
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: String
  }
  extend type Query {
    users: [User!]
    user(email: String!): User
    me: User
  }
  extend type Mutation {
    signUp(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Token!
    signIn(email: String!, password: String!): Token!
  }
  `
  