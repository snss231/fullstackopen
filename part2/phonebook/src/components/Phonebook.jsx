const Phonebook = ({persons, filter}) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) )
        .map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default Phonebook