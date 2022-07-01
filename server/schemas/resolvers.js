const { AuthenticationError } = require('apollo-server-express');
const { User, Food } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select(-__v -password)
                    .populate('foods');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('foods');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
              .select('-__v -password')
              .populate('foods');
        },
        foods: async (parent, { foodName }) => {
            const params = foodName ? { foodName } : {};
            return Food.find(params).sort({ expiration: -1 });
        },
        food: async (parent, { _id }) => {
            return Food.findOne({ _id });
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
    
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const token = signToken(user);
          return { token, user };
        },
        addFood: async (parent, args, context) => {
          if (context.user) {
            const food = await Food.create({ ...args});
    
            await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { foods: food._id } },
              { new: true }
            );
    
            return food;
          }
    
          throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;