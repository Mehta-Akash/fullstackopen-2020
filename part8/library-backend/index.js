const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Authors = require('./models/author')

const MONGODB_URI =
  'mongodb+srv://fullstack:YqDCbCnwlSdzlKc9@cluster0.pfluy.mongodb.net/library?retryWrites=true&w=majority'

console.log('Connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Authors.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
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
  Mutation: {
    addBook: async (root, args) => {
      let author = await Authors.findOne({ name: args.author })

      if (!author) {
        dbAuthor = await new Authors({ name: args.author })
        await dbAuthor.save()
      }
      const book = new Book({ ...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message)
      }
      return book
    },
    editAuthor: async (root, args) => {
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
