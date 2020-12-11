import { useQuery, useLazyQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommended = (props) => {
  const result = useQuery(ME)
  const [favouriteBooks, setFavouriteBook] = useState(null)
  const [getBooks, response] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (response.data) {
      setFavouriteBook(response.data.allBooks)
    }
  }, [response.data])

  useEffect(() => {
    if (result.data ) {
      result.data.me && getBooks({ variables: { genre: result.data.me.favoriteGenre } })
    }
  }, [getBooks, result.data])

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <p>loading...</p>
  }

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
          {favouriteBooks &&
            favouriteBooks.map((a) => (
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
