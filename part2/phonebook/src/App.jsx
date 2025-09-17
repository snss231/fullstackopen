import { useState } from 'react'

import Phonebook from './components/Phonebook'
import Form from './components/Form'
import Search from './components/Search'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 

  const [newInfo, setNewInfo] = useState({})
  const [filter, setfilter] = useState("")


  const handleSubmit = e => {
    e.preventDefault();
    if (persons.some(person => person.name === newInfo.name)) {
      alert(`${newInfo.name} is already added to phonebook`)
      return;
    }
    setPersons(persons.concat({
      name: newInfo.name,
      number: newInfo.number
    }))
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
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleFilterChange={handleFilterChange}></Search>
      <Form handleSubmit={handleSubmit} makeChangeHandler={makeChangeHandler}></Form>
      <Phonebook persons={persons} filter={filter}></Phonebook>
    </div>
  )
}

export default App