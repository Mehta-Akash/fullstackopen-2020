import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommended from './components/Recommended'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

function App() {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      console.log('object in includeIn:', object)
      set.map((b) => b.id).includes(object.id)
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    console.log('dataInStore: ', dataInStore)
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`Book added: ${subscriptionData.data.bookAdded.title}`)
      const bookAdded = subscriptionData.data.bookAdded
      updateCacheWith(bookAdded)
    },
  })

  useEffect(() => {
    const getToken = localStorage.getItem('library-user-token')
    setToken(getToken)
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} updateCacheWith={updateCacheWith} />

      <LoginForm show={page === 'login'} setToken={setToken} />

      <Recommended show={page === 'recommend'} />
    </div>
  )
}

export default App
