import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const SetBirthYear = () => {
  const [name, setName] = useState('')
  const [birth, setBorn] = useState('')

  const [editBook] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      console.log(error)
    },
  })

  const submit = (event) => {
    event.preventDefault()

    console.log('edit book...')
    console.log('name: ', name)
    console.log('birtYear: ', birth)

    let setBornTo = parseInt(birth)

    editBook({ variables: { name, setBornTo } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
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
