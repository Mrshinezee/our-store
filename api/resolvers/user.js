import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { isAdmin, isAuthenticated } from './authorization';
import UserValidation from '../utils/validation';
import generateVerificationToken from '../utils/helpers/generateVerificationToken';
import sendVerification from '../services/sendGrid';

const createToken = async (user, secret, expiresIn) => {
  const { id, email, role } = user;
  return await jwt.sign({ id, email, role }, secret, {
    expiresIn,
  });
};

const hashPassword = (password) => bcrypt.hashSync(password, 10);

const isValidPassword = (userPassword, password) => bcrypt.compareSync(password, userPassword);

export default {
  Query: {
    users: async (parent, args, { models }) => await models.User.findAll(),
    user: async (parent, { email }, { models }) => await models.User.findOne({ where: { email } }),
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
      {
        firstName, lastName, email, password
      },
      { models, secret },
    ) => {
      const newUser = {
        firstName,
        lastName,
        email,
        password: hashPassword(password),
      };
      const verificationToken = generateVerificationToken();
      const { error, isValid } = UserValidation.validateSignUpInput(newUser);
      if (isValid) {
        throw new UserInputError(
          'Please provide a valid information',
        );
      }
      const alreadyExist = await models.User.findOne({ where: { email: newUser.email } });
      if (alreadyExist) {
        throw new UserInputError(
          'This email has already been registered',
        );
      }
      const user = await models.User.create({
        ...newUser,
        role: 'customer',
      });
      sendVerification(email, verificationToken);

      return { token: createToken(user, secret, '50m') };
    },
    signIn: async (
      parent,
      { email, password },
      { models, secret },
    ) => {
      const info = {
        email,
        password,
      };

      const { isValid } = UserValidation.validateLoginInput(info);

      if (isValid) {
        throw new UserInputError(
          'Please provide a valid information',
        );
      }
      const user = await models.User.findOne({ where: { email } });

      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.',
        );
      }

      const validatePassword = isValidPassword(user.password, password);

      if (!validatePassword) {
        throw new AuthenticationError('Invalid password.');
      }

      return { token: createToken(user, secret, '50m') };
    },
  },
};
