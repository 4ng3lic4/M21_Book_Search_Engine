//routes will be replaced by the schemas
const {User, Book} = require('../models');
const {AuthenticationError} = require('apollo-server-express');
const { signToken} =require('../utils/auth');
const { countDocuments } = require('../models/User');

const resolvers = {
Query: {
 me: async (parent,args,context) => {
    if (context.user) {
        const userData = await User.findOne ({_id: context.user._id})
        .select('-__v -password')
        return userData;
    }
    throw new AuthenticationError('You are not logged in!');
 }
},

Mutation: {
    addUser: async (parent,args) => {
        const user = await User.create(args);
        const token = signToken(user);
        return{ token, user};
    },
    login: async (parent, {email, password}) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new AuthenticationError('Wrong credentials')
        }
const correctPw = await user.isCorrectPassword(password);
if(!correctPw) {
    throw new AuthenticationError('Wrong credentials')
}
const token = signToken(user);
return { token, user};
    },

    saveBook: async (parent, { book}, context) => {
        if (context.user) {
            const updateUser = await User.findOneAndUpdate(
                {_id: countDocuments.user._id},
                {$addToSet: {savedBooks: book}},
                {new: true}
            )
            return updateUser;
        }
        throw new AuthenticationError('Please log in first!')
    },
    removeBook: async (parent, {bookId}, context) => {
        if (context.user) {
            const updateUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                {$pull: { savedBooks: { bookId: bookId}}},
                {new: true}
            )
            return updateUser;
        }
    }
}

};