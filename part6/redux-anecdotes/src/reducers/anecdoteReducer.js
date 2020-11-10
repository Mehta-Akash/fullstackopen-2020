import anecdoteService from '../services/anecdotes'

const asObject = (anecdote) => {
  return {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes,
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map((anec) => (anec.id !== id ? anec : changedAnecdote))
    case 'NEW_ANECDOTE':
      const newAnecdote = asObject(action.data)
      return state.concat(newAnecdote)
    case 'INIT_ANECDOTES':
      return action.data  
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdotes(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const increaseVote = (id) => {
  return {
    type: 'VOTE',
    data: id,
  }
}

export const initialiseAnecdotes = () => {
 return async dispatch => {
   const anecdotes = await anecdoteService.getAll()
   dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes
   })
 }
}

export default reducer
