const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: { type: String, required: true, minLength: 3, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})
module.exports = mongoose.model('User', userSchema)