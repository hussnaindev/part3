require('dotenv').config()
const express = require ('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('req_name', function (req, res) { return req.body.name })
morgan.token('req_num', function (req,res) {return req.body.number})
app.use(morgan(':req_name :req_num'))


    let persons = [
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 1
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 2
      },
      {
        "name": "Arto Hellas",
        "number": "1234-2376-98",
        "id": 3
      },
      {
        "name": "Albert Einstein",
        "number": "56921-1231-12",
        "id": 4
      },
      {
        "name": "Waris Ali",
        "number": "12345-3456-8",
        "id": 5
      },
      {
        "name": "Kashif Raza",
        "number": "03065648475",
        "id": 6
      }
    ]

const count = (persons) =>
{
    return persons.length
}


app.get('/api/persons',(request,response)=>
{
    Person.find({}).then(person => 
    response.json(person)
)})

app.get('/api/persons/:id',(request,response) => 
{
  Person
    .findById(request.params.id).then(person =>response.json(person))
    .catch( error =>
    {
      console.log("unable to fetch data")
      response.status(404).end()

    })
})

app.post('/api/persons/',(request,response)=>
{
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'some info is missing' 
    })
  }

  const newPerson =
  {
    name: body.name,
    number: body.number,
    id: generateId()
  }
  persons = persons.concat(newPerson)
  response.json(newPerson)
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  return maxId + 1
}

app.get('/info',(request,response)=>
{
    const total = count(persons)
    str = `Phonebook has info of ${total} people`
    const date = Date()
    const arr = [str,date]
    response.json(arr)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})


const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)