import React from 'react'
import { Link } from 'react-router-dom'
import { Tab, Table } from 'react-bootstrap'

const AnecdoteList = ({ anecdotes }) => (
    <div>
      <Table striped>
        <tbody>
          <h2>Anecdotes</h2>
          <ul>
            {anecdotes.map(anecdote => 
              <tr key={anecdote.id}>
                <td>
                <Link to={`/anecdotes/${anecdote.id}`}>
                  {anecdote.content}
                </Link>
                </td>
              </tr>
            )}
          </ul>
      </tbody>
      </Table>
    </div>
  )

  export default AnecdoteList