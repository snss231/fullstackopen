import { useState } from 'react'

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
      <div>filter shown with <input onChange={handleFilterChange}></input></div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={makeChangeHandler("name")}/>
        </div>
        <div>
          number: <input onChange={makeChangeHandler("number")}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) )
        .map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App