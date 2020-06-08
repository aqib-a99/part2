import React from 'react'

const Total = ({course}) => {
    const parts = course.parts
    let x = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
    return(
        <h4>
            total of {x} exercises
        </h4>
    )
}


export default Total