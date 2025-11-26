const app = require('./app')

const PORT = 3003

app.then(a => a.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}));