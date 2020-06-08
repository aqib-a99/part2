import React from 'react'

const Alert = ({message}) => {
    if(message === null){
        return null
    }

    return(
        <div className = "alertNotif">
            {message}
        </div>
    )
}

export default Alert