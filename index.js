require('dotenv').config()
const express = require ('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('req_name', function (req, res) { return req.body.name })
morgan.token('req_num', function (req,res) {return req.body.number})
app.use(morgan(':req_name :req_num'))


const count = (persons) =>
{
    return persons.length
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.get('/api/persons',(request,response)=>
{
    Person.find({}).then(person => 
    response.json(person)
)})

app.get('/api/persons/:id',(request,response,next) => 
{
  Person
    .findById(request.params.id).then(person =>
      {
        if(person)
        {
          response.json(person)
        }
        else
        {
          console.log("not found")
          response.status(404).end()
        }
      })
    .catch( error =>
    {
      next(error)
      console.log("unable to fetch data")
      response.status(404).end()
    })
})

app.post('/api/persons/',(request,response)=>
{
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'some information is missing' 
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

app.delete('/api/persons/:id', (request, response) => 
{  
  Person.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => 
      {
         console.log(error)
         response.status(404).end()
      })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}


app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)