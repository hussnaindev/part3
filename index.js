const express = require ('express')
const app = express()

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
      }
    ]


app.get('/api/persons',(request,response)=>
{
    response.json(persons)
})

const PORT = 3010
app.listen(PORT)
console.log(`Server running on port ${PORT}`)