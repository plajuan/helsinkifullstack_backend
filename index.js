const express = require('express')
const app = express()

app.use(express.json())

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

function generateId(){
  return Math.floor(Math.random() * (Math.pow(2,31)-1))
}

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

app.get('/api/persons/:id', (req,res)=>{
  const id = Number(req.params.id)
  const person = persons.find(it => it.id === id)
  if (person){
    res.json(person)
  } else {
    res.status(404).end()
  }
  
})

app.delete('/api/persons/:id', (req,res)=>{
  const id = Number(req.params.id)
  persons = persons.filter(it => it.id !== id)
  res.status(204).end()
  console.log(persons)
})

app.post('/api/persons', (req,res)=>{  
  const person = req.body
  if (!person.name){
    return res.status(400).json({error: "name is missing"})
  }
  if (!person.number){
    return res.status(400).json({error: "number is missing"})
  }
  const nameExists = persons.find(it => it.name === person.name)
  if(nameExists){
    return res.status(400).json({error: "name already exists in the phonebook"})
  }
  
  person.id = generateId()
  persons.push(person)  
  res.json(person)
})

app.listen(3001, () => {
    console.log('Server running on port 3001')
})