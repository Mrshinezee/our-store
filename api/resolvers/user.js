import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { isAdmin, isAuthenticated} from './authorization'
import UserValidation from '../utils/validation';

const createToken = async (user, secret, expiresIn) => {
  const { id, email, role } = user;
  return await jwt.sign({ id, email, role }, secret, {
    expiresIn,
  });
};

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
}

const isValidPassword = (userPassword, password) => {
return bcrypt.compareSync(password, userPassword)
}

export default {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (parent, { email }, { models }) => {
      return await models.User.findOne({ where: { email } });
    },
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }
      return await models.User.findOne({ where: { email: me.email } });
    },
  },

  Mutation: {
    signUp: async (
      parent,
      { firstName, lastName, email, password },
      { models, secret },
    ) => {
      const newUser = {
        firstName,
        lastName,
        email,
        password: hashPassword(password),
      };
      const {error, isValid} = UserValidation.validateSignUpInput(newUser);
      if(isValid) {
        throw new UserInputError(
          'Please provide a valid information',
        );
      }
      const alreadyExist = await models.User.findOne({ where: {email: newUser.email}});
      if(alreadyExist){
        throw new UserInputError(
          'This email has already been registered',
        );
      }
      const user = await models.User.create({
        ...newUser,
        role: "customer",
      });

      return { token: createToken(user, secret, '50m') };
    },
  },
}
