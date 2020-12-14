const Authors = require('../models/author')
const { AuthenticationError } = require('apollo-server')

const author = `
  extend type Query {
    authorCount: Int!
    allAuthors: [Author!]!
  }
  extend type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
  }  
  type Author {
      name: String!
      born: Int
      id: ID!
      bookCount: Int!
    }
`

const authorResolver = {
  Query: {
    authorCount: () => Authors.collection.countDocuments(),
    allAuthors: async () => {
      const authors = await Authors.find({})
      console.log('Author.find')
      return authors
    },
  },
  Author: {
    bookCount: async (root, _, context) => {
      return context.bookLoader.load(root._id)
    },
  },
}

const authorMutation = {
  Mutation: {
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Authors.findOne({ name: args.name })
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
  },
}

module.exports.author = author
module.exports.authorResolver = authorResolver
module.exports.authorMutation = authorMutation
