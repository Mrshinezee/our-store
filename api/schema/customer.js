import { gql } from 'apollo-server-express';

export default gql`
  type Token {
      token: String!
   }
  type Customer {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    role: String
  }
  extend type Query {
    customers: [Customer!]
    Customer(id: ID!): Customer
    me: Customer
  }
  extend type Mutation {
    signUp(
      firstname: String!
      lastname: String!
      email: String!
      password: String!
    ): Token!
    signIn(login: String!, password: String!): Token!
    updateUser(username: String!): Customer!
    deleteUser(id: ID!): Boolean!
  }
  `