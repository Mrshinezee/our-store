import { GraphQLDateTime } from 'graphql-iso-date';

const customScalarResolver = {
  Date: GraphQLDateTime
};

import userResolver from './user';
import productResolver from './product';

export default [customScalarResolver, userResolver, productResolver];
