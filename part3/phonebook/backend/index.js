const express = require('express')
var morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

morgan.token('data', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
    const { id } = req.params
    const person = persons.find(p => p.id == id)
    return person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const { id } = req.params
    const person = persons.find(p => p.id == id)
    persons = persons.filter(p => p.id !== id)
    return person ? res.json(person) : res.status(404).end()
})

app.post('/api/persons', (req, res) => {
    const { body } = req;

    if (!body.name) {
        res.status(400).json({ error: "missing name"})
        return;
    }

    if (!body.number) {
        res.status(400).json({ error: "missing number"})
        return;
    }

    if (persons.find(p => p.name === body.name)) {
        res.status(400).json({ error: "name must be unique"})
        return;
    }
    const person = {...body, id: Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString()}
    persons = [...persons, person]
    res.json(person)
})

app.put('/api/persons/:id', (req, res) => {
    const { body } = req;
    const { id } = req.params;

    if (!body.name) {
        res.status(400).json({ error: "missing name"})
        return;
    }

    if (!body.number) {
        res.status(400).json({ error: "missing number"})
        return;
    }

    const person = {...body, id: Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}
    persons = persons.map(p => p.id === id ? person : p)
    res.json(person)
})


app.get('/info', (req, res) => {
    res.send(`<div>Phonebook has info for ${persons.length} people
<br/>
<br/>
${new Date()}</div>`);
})


const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})