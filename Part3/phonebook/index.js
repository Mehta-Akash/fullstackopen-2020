require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Phonenumber = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] :response-time ms :data')
)

morgan.token('data', (req, res) => {
  return JSON.stringify(req.body)
})

//get all the people in the phonebook
app.get('/api/persons', (req, res, next) => {
  Phonenumber.find({})
    .then((result) => {
      res.json(result)
    })
    .catch((error) => next(error))
})

//get infomation about the phonebook including number of entries and date accessed
app.get('/info', (req, res) => {
  let date = new Date()
  Phonenumber.find({}).then((result) => {
    res.send(`<p>Phonebook has ${result.length} people <br><br> ${date}</p>`)
  })
})

// get a specific person from phonebook
app.get('/api/persons/:id', (req, res, next) => {
  Phonenumber.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }
  Phonenumber.findByIdAndUpdate(req.params.id, person, {
    new: true,
  })
    .then((updatedPerson) => {
      res.json(updatedPerson.toJSON())
    })
    .catch((error) => {
      next(error)
    })
})

//delete request
app.delete('/api/persons/:id', (req, res, next) => {
  Phonenumber.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

//post request that checks if the name of number is missing and checks if name already exists
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const newPerson = new Phonenumber({
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000),
  })

  newPerson
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedFormatedPerson) => {
      res.json(savedFormatedPerson)
    })
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//PORT
// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
