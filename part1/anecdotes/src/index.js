import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))

  const handleClick = () => setSelected(Math.floor(Math.random() * anecdotes.length));
  
  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const max = Math.max(...points)
  let index = points.indexOf(max)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]} <br></br> Has {points[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>Get random quote</button>
      <h2>Anecdote with most views</h2>
      <div>{max > 0 ? <p>{props.anecdotes[index]} <br></br> Has {max} points</p> : "No votes"}</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)