/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phoneNumber = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.pfluy.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonenumber = mongoose.model('Phonenumber', phonebookSchema)

if (process.argv.length < 4) {
  console.log('Phonebook:')
  Phonenumber.find({}).then((result) => {
    result.forEach((element) => {
      console.log(element.name, element.number)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const number = new Phonenumber({
    name: name,
    number: phoneNumber,
  })

  number.save().then(() => {
    console.log(`added ${name} number ${phoneNumber} to phonebook`)
    mongoose.connection.close()
  })
}
