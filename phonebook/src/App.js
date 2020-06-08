import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Alert from './components/Alert'



const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ filteredList, setFilteredList ] = useState([])
  const [ message, setMessage ] = useState(null)
  const [ alert, setAlert ] = useState(null)


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
      .catch(() => {
        setMessage('Data not found in directory')
        setTimeout(() => setMessage(null), 3000)
      })
  },[])
  
  const addData = (event) => {
    event.preventDefault()
    const personName = newName
    const phoneNumber = newNumber
    let nameList = []
    let numberList = []
    const personObject = {
      name: newName,
      number: newNumber
    }

    if(personName.length !== '' && phoneNumber !== ''){
      nameList = persons.filter(person => person.name === personName)
      numberList = persons.filter(person => person.number === phoneNumber)
      if(nameList.length === 0 && numberList.length === 0){
        axios
          .post('http://localhost:3001/persons', personObject)
          .then(response => response.data)
          .then(receiveData => {
            setMessage(`Contact "${personObject.name}" added to directory.`)
            setTimeout(() => setMessage(null), 3000)
            setPersons(persons.concat(personObject))
          })
          .catch(() => {
            setMessage('Data not found in directory')
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          }
          )
      }
    else{
      const nameRepeat = nameList.length !== 0 ? true : false
      const phoneRepeat = numberList.length !== 0 ? true: false
      if(phoneRepeat) window.alert(`${phoneNumber} already exists in the database`)
      if(nameRepeat) {
        let x = window.confirm(`${personName} is already added to the phonebook, replace the old number with the new one?`)
        if(x){
          let storedObject = persons.find(p => p.name === newName)
          const replacementObject = {...storedObject, number: newNumber}
          axios
            .put(`http://localhost:3001/persons/${storedObject.id}`, replacementObject)
            .then(response => setPersons(persons.map(p => p.name === personObject.name ? response.data : p))
            )
            .catch(() => {
              setMessage('Data not found in directory')
              setTimeout(() => setMessage(null), 3000)
            })
          }}
        
      
        }
    setNewName('')
    setNewNumber('')
    }
  }


  const handleDataChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    if(filter.length === 0){
      setFilteredList([])
    }
    else {
      const filterString = event.target.value
      let val = persons.filter(person => person.name.includes(filterString))
      let x = val.filter(vals => !filteredList.includes(vals))
      setFilteredList(x)
      } 
    }

  const handleDeletePressed = (person) => {
    let x = persons.filter(p => p.id !== person.id)
    if(window.confirm(`Are you sure you want to delete ${person.name}`)){
      console.log(x)
      setPersons(x)
      axios.delete(`http://localhost:3001/persons/${person.id}`)
      .then(() => {
        setAlert(`Contact ${person.name} deleted from directory`)
        setTimeout(() => setAlert(null), 3000)
      })
        .catch(() => {
          console.log('Information already removed from directory.')
          setAlert(`Information for ${person.name} has already been removed from the directory`)
          setTimeout(() => {
            setAlert(null) 
          }, 3000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {message}/>
      <Alert message = {alert} />
      <Filter change = {handleFilterChange} value = {filter} list = {filteredList}/>
      <PersonForm submit = {addData} nameOnChange = {handleDataChange} nameData = {newName} numberOnChange = {handleNumberChange} numberData = {newNumber} />
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Persons key = {person.id} data = {person} handleDelete = {() => handleDeletePressed(person)}/>
          )}
      </ul>
    </div>
  )
}
export default App