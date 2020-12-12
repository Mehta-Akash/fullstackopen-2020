const Authors = require('../models/author')
const Book = require('../models/book')
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

      const numBooksPerAuthor = authors.map(async (author) => {
        const bookNum = await Book.find({ author: author.id }).countDocuments()
        return {
          id: author.id,
          name: author.name,
          born: author.born,
          bookCount: bookNum,
        }
      })

      return numBooksPerAuthor
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
