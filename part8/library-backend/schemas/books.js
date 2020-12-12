const Book = require('../models/book')
const Authors = require('../models/author')

const books = `
  extend type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
  }  
  type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
      id: ID!
    }
  extend type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
      ): Book
    }
`
const bookResolver = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate('author')

      if (!args.author && !args.genre) {
        return books
      }
      if (args.author && args.genre) {
        return books.filter(
          (book) =>
            book.author.name === args.author && book.genres.includes(args.genre)
        )
      }
      return args.author
        ? books.filter((book) => book.author.name === args.author)
        : books.filter((book) => book.genres.includes(args.genre))
    },
  },
  Book: {
    author: (root) => {
      return {
        born: root.author.born,
        name: root.author.name,
      }
    },
  },
}

const bookMutation = {
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let author = await Authors.findOne({ name: args.author })
      if (!author) {
        author = await new Authors({ name: args.author })
        await author.save()
      }
      const book = new Book({ ...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message)
      }
      return book
    },
  },
}

module.exports.book = books
module.exports.bookResolver = bookResolver
module.exports.bookMutation = bookMutation
