const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.ic6qnun.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Entry = mongoose.model('Entry', entrySchema)

if (process.argv.length === 3) {
  Entry
    .find({})
    .then(entries => {
      console.log('phonebook:')
      entries.forEach(e => {
        console.log(`${e.name} ${e.number}`)
      })
      mongoose.connection.close()
    })
}
if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const entry = new Entry({
    name: name,
    number: number
  })
  entry.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

