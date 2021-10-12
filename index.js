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

  const person = new Person(
    {
      name: body.name,
      number: body.number
    }
  )
  
  person.save().then(person =>
  console.log("person successfully added"))
  response.json(person)
})

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
