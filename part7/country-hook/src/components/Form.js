import React from 'react'
import { useField } from '../hooks/index'

const Form = ({setName}) => {
    const nameInput = useField('text')

    const fetch = (e) => {
        e.preventDefault()
        setName(nameInput.value)
    }

    return (
    <div>
    <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      </div>
    )}

export default Form