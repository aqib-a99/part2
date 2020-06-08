import React from 'react'

const PersonForm = ({submit, nameOnChange, nameData, numberOnChange, numberData}) => {
    return(<form onSubmit = {submit}>
          name: <input onChange = {nameOnChange} value = {nameData}/>
          <div>number: <input onChange = {numberOnChange} value = {numberData}/></div>
          <button type="submit">add</button>
      </form>)
}

export default PersonForm