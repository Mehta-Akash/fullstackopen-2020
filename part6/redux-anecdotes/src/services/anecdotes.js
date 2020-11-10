import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdotes = async (content) => {
    const object = {content, votes: 0}
    const response = await axios.post(baseUrl, object)
    return response.data
}

const voteAnecdote = async (anecdote) => {
    const id = anecdote.id
    console.log(anecdote.id);
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    console.log(updatedAnecdote);
    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return response.data
}

export default {getAll, createAnecdotes, voteAnecdote}