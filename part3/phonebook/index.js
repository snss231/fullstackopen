const express = require('express')
const app = express()

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
    return res.status(person ? 204 : 404).end()
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