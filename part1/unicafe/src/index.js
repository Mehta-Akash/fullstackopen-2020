import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import './index.css';

const Button = (props) =>(
  <button onClick={props.handleClick}>{props.text}</button>
)
const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad;

  if (total === 0){
    return "No feedback given"
  }
  return (
    <table>
      <Statistic text="Good" value ={good} />
      <Statistic text="Neutral" value ={neutral} />
      <Statistic text="Bad" value ={bad} />
      <Statistic text="All" value ={total} />
      <Statistic text="Average" value ={Math.round(((good-bad)/total) * 10)/10} />
      <Statistic text="Positive" value ={Math.round((100*good/total) * 10)/10} />
    </table>
  )
}


const Statistic = (props) => {
  if (props.text === "Positive"){
    return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}%</td>
      </tr>
    </tbody>
    )
  }
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  )
}

const App = (props) => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick ={()=> setGood(good + 1)} text='Good'/>
      <Button handleClick = {() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick = {() => setBad(bad + 1)} text='bad' />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);