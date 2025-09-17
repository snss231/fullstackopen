import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 

  const [newInfo, setNewInfo] = useState({})

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
  
  return (
    <div>
      <div>debug: {newInfo.name}</div>
      <h2>Phonebook</h2>
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
      {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App