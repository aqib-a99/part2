import React from 'react'

const Filter = ({change, value, list}) => {
    return(
        <div>
        filter shown with: <input onChange = {change} value = {value}/>  
        <ul>
          {list.map(ListElement => <li key = {ListElement.number}>{ListElement.name} <strong>{ListElement.number}</strong></li>)}
        </ul>
      </div>
    )
}

export default Filter