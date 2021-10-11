const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the person as an argument: node mongo.js <password>')
    process.exit(1)
  }
  
  if(process.argv.length > 3)
  {
    const nameParams = process.argv[3]
    const numberParams = process.argv[4]
  }

  const password = process.argv[2]
  
  const url = `mongodb+srv://hussnain:${password}@cluster0.f4yln.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  
  mongoose.connect(url)
  
  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })
  
  const Person = mongoose.model('Person', personSchema)
  
  if(process.argv.length > 3)
  {
    const nameParams = process.argv[3]
    const numberParams = process.argv[4]

    const person = new Person({
        name: nameParams,
        number: numberParams
      })
  
    person.save().then(result => {
    console.log(`added ${nameParams} number ${numberParams} to Phonebook`)
    mongoose.connection.close()
  })
  }

    Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
   })


  
  