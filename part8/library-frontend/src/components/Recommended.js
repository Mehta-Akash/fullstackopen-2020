import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommended = (props) => {
  const result = useQuery(ME)
  const allBooks = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }
  if (result.loading && allBooks.loading) {
    return <p>loading...</p>
  }

  let books = allBooks.data.allBooks.filter((b) =>
    b.genres.includes(result.data.me.favoriteGenre)
  )

  return (
    <div>
      <h1>Recommendations</h1>
      <p>
        Books in your favourite genre <b>{result.data.me.favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
