import React from 'react'

const Part = ({courseList}) => {
    return (
        courseList.map(courseData =>
            <li key = {courseData.id}><p>{courseData.name} {courseData.exercises}</p></li>)
    )
  }

  export default Part
