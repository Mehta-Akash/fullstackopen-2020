import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [bookToShow, setBookToShow] = useState('')

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  let books = result.data.allBooks

  let genreList = []
  books.map((a) => {
    genreList = [...genreList, ...a.genres]
    return genreList
  })
  genreList.push('all genres')
  genreList = [...new Set(genreList)]

  let i = 0

  const filter = ({ target }) => {
    const booksByGenre = result.data.allBooks.filter((a) => {
      return a.genres.includes(target.outerText)
    })
    target.outerText === 'all genres'
      ? setBookToShow(books)
      : setBookToShow(booksByGenre)
  }

  let book = bookToShow ? bookToShow : books

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {book.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genreList.map((a) => (
        <button key={i++} onClick={filter}>
          {a}
        </button>
      ))}
    </div>
  )
}

export default Books
