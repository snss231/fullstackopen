import { useEffect, useState, } from 'react'

import Phonebook from './components/Phonebook'
import Form from './components/Form'
import Search from './components/Search'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newInfo, setNewInfo] = useState({})
  const [filter, setfilter] = useState("")
  const [notification, setNotification] = useState({})
  

  const handleSubmit = e => {
    e.preventDefault();
    var existing = persons.find(person => person.name === newInfo.name);
    if (!existing) {
      phonebookService
        .create(newInfo)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNotification({message: `Added ${newPerson.name}`})
          setTimeout(() => {
            setNotification({})
          }, 5000)
        })
        .catch(error => {
          setNotification({message: `Person validation failed: ${error.response.data.error}`, isError: true})
          setTimeout(() => {
            setNotification({})
          }, 5000)
        })
      return
    }

    if (confirm(`${newInfo.name} is already added to phonebook, replace the old number with a new one?`)) {
      phonebookService.update(existing.id, newInfo)
        .then(newPerson => {
          setPersons(persons.map(person => person.id === existing.id 
            ? newPerson : person))
          setNotification({message: `Updated ${newPerson.name}`})
          setTimeout(() => {
            setNotification({})
          }, 5000)
        })
        .catch(error => {
          setNotification({message: `Person validation failed: ${error.response.data.error}`, isError: true})
          setTimeout(() => {
            setNotification({})
          }, 5000)
        })
    }
  }

  const handleDelete = person => {
    if (!confirm(`Are you sure you want to delete "${person.name} ${person.number}"?`)) {
      return
    }
    phonebookService
      .deleteById(person.id)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== deletedPerson.id))
      })
      .catch(error => {
        setNotification({
          message: `Information of ${person.name} has already been removed from server`,
          isError: true
        })
        setTimeout(() => setNotification({}), 5000)
      })
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
      <Notification message={notification.message} isError={notification.isError}></Notification>
      <Search handleFilterChange={handleFilterChange}></Search>
      <Form handleSubmit={handleSubmit} makeChangeHandler={makeChangeHandler}></Form>
      <Phonebook persons={persons} filter={filter} handleDelete={handleDelete}></Phonebook>
    </div>
  )
}

export default App