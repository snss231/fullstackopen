const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('data', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  Person.findById(id)
    .then(person => {
       person ? res.json(person) : res.status(404).end()
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  Person.findByIdAndDelete(id) 
    .then(person => {
      person ? res.json(person) : res.status(404).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
  const { body } = req;

  if (!body.name) {
    res.status(400).json({ error: "missing name" })
    return;
  }

  if (!body.number) {
    res.status(400).json({ error: "missing number" })
    return;
  }

  if (Person.find({ name: body.name }).length) {
    res.status(400).json({ error: "name must be unique" })
    return;
  }
  const person = new Person(body)
  person.save().then(result => {
    res.json(person)
  })
})

app.put('/api/persons/:id', (req, res) => {
  const { body } = req;
  const { id } = req.params;

  if (!body.name) {
    res.status(400).json({ error: "missing name" })
    return;
  }

  if (!body.number) {
    res.status(400).json({ error: "missing number" })
    return;
  }

  Person.findByIdAndUpdate(id, body)
    .then(person => {
      res.json(person)
    })
})


app.get('/info', (req, res) => {
  Person.countDocuments({}).then(
    count => {
      res.send(`<div>Phonebook has info for ${count} people
<br/>
<br/>
${new Date()}</div>`);
    }
  )
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})