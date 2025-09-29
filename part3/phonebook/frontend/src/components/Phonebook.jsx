const Phonebook = ({persons, filter, handleDelete}) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) )
        .map(person => <div key={person.name}>{person.name} {person.number} <button onClick={_ => handleDelete(person)}>delete</button></div>)}
    </div>
  )
}

export default Phonebook