const { merge } = require('lodash')
const {
  ApolloServer,
  gql,
  UserInputError,
  makeExecutableSchema,
} = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const User = require('./models/user')
const { MONGODB_URI, JWT_SECRET } = require('./utils/config')
const jwt = require('jsonwebtoken')
const { author, authorResolver, authorMutation } = require('./schemas/author')
const {
  book,
  bookResolver,
  bookMutation,
  bookSubscription,
} = require('./schemas/books')
const { user, userResolver, userMutation } = require('./schemas/user')

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

const query = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    login(username: String!, password: String!): Token
  }
  type Token {
    value: String!
  }
  # type Subscription {
  #   bookAdded: Book!
  # }
`

const resolvers = {
  Mutation: {
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError('Wrong credentials!')
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

const schema = makeExecutableSchema({
  typeDefs: [query, author, book, user],
  resolvers: merge(
    resolvers,
    bookResolver,
    authorResolver,
    userResolver,
    bookMutation,
    authorMutation,
    userMutation,
    bookSubscription
  ),
})

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
