import { useEffect, useState, } from 'react'

import Phonebook from './components/Phonebook'
import Form from './components/Form'
import Search from './components/Search'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newInfo, setNewInfo] = useState({})
  const [filter, setfilter] = useState("")
  

  const handleSubmit = e => {
    e.preventDefault();
    if (persons.some(person => person.name === newInfo.name)) {
      alert(`${newInfo.name} is already added to phonebook, replace the old number with a new one?`)
      return;
    }

    phonebookService.create({
      name: newInfo.name,
      number: newInfo.number
    })
    .then(newPerson => {
      setPersons(persons.concat(newPerson))
    })
  }

  const handleDelete = person => {
    if (!confirm(`Are you sure you want to delete "${person.name} ${person.number}"?`)) {
      return
    }
    phonebookService
      .deleteById(person.id)
      .then(deletedPerson => setPersons(persons.filter(person => person.id !== deletedPerson.id)))
  }

  const makeChangeHandler = field => e => {
    setNewInfo({
      ...newInfo,
      [field]: e.target.value
    })
  }

  const handleFilterChange = e => {
    setfilter(e.target.value)
  }

  useEffect(() => {
    phonebookService.getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, []);
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleFilterChange={handleFilterChange}></Search>
      <Form handleSubmit={handleSubmit} makeChangeHandler={makeChangeHandler}></Form>
      <Phonebook persons={persons} filter={filter} handleDelete={handleDelete}></Phonebook>
    </div>
  )
}

export default App