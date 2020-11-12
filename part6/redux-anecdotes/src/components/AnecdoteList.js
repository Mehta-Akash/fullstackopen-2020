import React from 'react'
import { connect } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import {
  setNotification
} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  // const dispatch = useDispatch()
  // const anecdotes = useSelector((state) => state.anecdote)
  // const filteredAnecdotes = useSelector((state) => state.filter)

  const vote = (anecdote) => {
    // dispatch(increaseVote(anecdote))
    props.increaseVote(anecdote)
    const notification = `You voted for '${anecdote.content}'`
    // dispatch(setNotification(notification, 3))
    props.setNotification(notification, 5)
  }

  // const sort = (anecdotes) => {
  //   return anecdotes.sort((first, second) => second.votes - first.votes)
  // }
  // const orderedAnecdote = filteredAnecdotes
  //   ? sort(filteredAnecdotes)
  //   : sort(anecdotes)

  return (
    <div>
      {props.anecdote.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}



const mapStateToProps = (state) => {
  const sort = (anecdotes) => {
    return anecdotes.sort((first, second) => second.votes - first.votes)
  }
  
  if (state.filter) {
    return {
      anecdote: sort(state.filter)
    }
  }
  return {
    anecdote: sort(state.anecdote)
  }
}

const mapDispatchToProps = {
  increaseVote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
// export default AnecdoteList
