import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const SetBirthYear = ({ authors }) => {
  const [authorName, setName] = useState('')
  const [birth, setBorn] = useState('')

  const [editBook] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      console.log(error)
    },
  })

  const submit = (event) => {
    event.preventDefault()

    console.log('edit book...')

    let setBornTo = parseInt(birth)
    let name = authorName.value

    editBook({ variables: { name, setBornTo } })

    setName('')
    setBorn('')
  }

  const authorNames = authors.map((a) => {
    return {
      label: a.name,
      value: a.name,
    }
  })
  const style = {
    width: '300px',
  }

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit} style={style}>
        <Select
          options={authorNames}
          placeholder="Select author"
          isSearchable
          onChange={setName}
        />
        <div>
          born
          <input
            value={birth}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthYear
