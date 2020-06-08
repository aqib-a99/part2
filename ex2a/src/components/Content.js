import React from 'react'
import Part from './Part'

const Content = ({ course }) => {
    return (
        <ul>
        <Part courseList = {course.parts}/>
    </ul>
    )
  }

  export default Content