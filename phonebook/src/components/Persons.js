import React from 'react'

const Persons = (props) => {
  return(
    <li key = {props.key}> {props.data.name} <strong>{props.data.number}</strong><button onClick = {props.handleDelete}>Delete</button></li>
  )
}

export default Persons