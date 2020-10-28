import { gql } from 'apollo-server-express';

export default gql`
  
  type Product {
    id: ID!
    name: String!
    media: String
    price: String!
    description: String!
  }
  extend type Query {
    products: [Product]
  } 
  `;
