const User = require('../models/user')

const user = `
  extend type Query {
    me: User
  } 
  extend type Mutation {
    createUser(username: String!, favoriteGenre: String!): User
  } 
  type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }
`

const userResolver = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
  },
}

const userMutation = {
  Mutation: {
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
  },
}

module.exports.user = user
module.exports.userResolver = userResolver
module.exports.userMutation = userMutation
