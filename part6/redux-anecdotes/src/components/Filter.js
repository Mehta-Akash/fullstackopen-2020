import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = (props) => {
  // const anecdotes = useSelector((state) => state.anecdote)

  // const dispatch = useDispatch()

  const handleChange = (event) => {
    const filteredText = event.target.value
    const filteredAnecdotes = props.anecdote.filter((anecdote) =>
      anecdote.content.includes(filteredText)
    )
    // dispatch(filterAnecdotes(filteredAnecdotes))
    props.filterAnecdotes(filteredAnecdotes)
  }

  const style = {
    marginBottom: 10,
    marginTop: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote
  }
}

const mapDispatchtoProps = {
  filterAnecdotes
}

export default connect(mapStateToProps, mapDispatchtoProps)(Filter)
