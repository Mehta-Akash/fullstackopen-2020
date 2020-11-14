import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const request = await axios.get(baseUrl)
    setResources(request.data)
  }

  const create = async (resource) => {
    const request = await axios.post(baseUrl, resource)
    console.log(request);
    setResources(resources.concat(request.data))
  }

  const service = {
    create,
    getAll
  }

  return [
    resources, service
  ]
}