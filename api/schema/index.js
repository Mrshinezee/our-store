import {gql} from 'apollo-server-express';
import customerSchema from './customer';

const baseSchema =  gql`
scalar Date
type Query {
  _: Boolean
}
type Mutation {
  _: Boolean
}
type Subscription {
  _: Boolean
}
`;
export default [baseSchema, customerSchema]