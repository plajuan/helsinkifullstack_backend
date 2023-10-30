const express = require('express')
const app = express()

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req,res)=>{
  const today = new Date()
  const pe = persons.length > 1 ? "people" : "person"
  const txt = `<p>Phonebook has info for ${persons.length} ${pe} </p>
  <p>${today}</p>`
  res.send(txt)
})

app.listen(3001, () => {
    console.log('Server running')
})