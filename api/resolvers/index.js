import {GraphQLDateTime} from 'graphql-iso-date'

const customScalarResolver = {
    Date: GraphQLDateTime,
  };

import customerResolver from './customer';

export default [customScalarResolver, customerResolver]