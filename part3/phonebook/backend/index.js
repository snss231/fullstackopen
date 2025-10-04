const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Entry = require('./models/entry')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('data', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (req, res) => {
  Entry.find({})
    .then(persons => {
      res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params
  Entry.findById(id)
    .then(person => {
       person ? res.json(person) : res.status(404).end()
    })
})

app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params
  Entry.findByIdAndDelete(id) 
    .then(person => {
      person ? res.json(person) : res.status(404).end()
    })
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

  if (Entry.find({ name: body.name }).length) {
    res.status(400).json({ error: "name must be unique" })
    return;
  }
  const person = new Entry(body)
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

  Entry.findByIdAndUpdate(id, body)
    .then(person => {
      res.json(person)
    })
})


app.get('/info', (req, res) => {
  Entry.countDocuments({}).then(
    count => {
      res.send(`<div>Phonebook has info for ${count} people
<br/>
<br/>
${new Date()}</div>`);
    }
  )
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})