import React from 'react'

const PersonForm = (props) => {
    [onSubmit, nameOnChange, nameData, numberOnChange, numberData] = props
    return(<form onSubmit = {onSubmit}>
          name: <input onChange = {nameOnChange} value = {nameData}/>
          <div>number: <input onChange = {numberOnChange} value = {numberData}/></div>
          <button type="submit">add</button>
      </form>)
}

export default PersonForm