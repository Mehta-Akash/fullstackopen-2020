require('dotenv').config()

const { PORT } = process.env
let { MONGODB_URI } = process.env
const { JWT_SECRET } = process.env

module.exports = {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
}
