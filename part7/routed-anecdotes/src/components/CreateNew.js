import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks/index'
import _ from 'lodash'
import { Table, Form, Button } from 'react-bootstrap'

const CreateNew = (props) => {
    const content = useField('content')
    const author = useField('author')
    const info = useField('info')

    const history = useHistory()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      if(cont.value === ''){
        return
      }
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      props.setNotification(`A new anecdote '${content.value}' created!`)
      setTimeout(() => {
        props.setNotification('')
      }, 10000)
      history.push('/')
    }
  
    const clear = () => {
      content.reset()
      author.reset()
      info.reset()
    }

    const cont = _.omit(content, 'reset')
    const aut = _.omit(author, 'reset')
    const inf = _.omit(info, 'reset')
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>
              content
            </Form.Label>  
              <Form.Control {...cont}/>
            
            <Form.Label>
              author
            </Form.Label>  
              <Form.Control {...aut}/>
            <Form.Label>
              url for more info
            </Form.Label>
              <Form.Control {...inf}/>
            <Button variant="primary">Create</Button>
            <Button variant="secondary" onClick={clear}>Reset</Button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  export default CreateNew

  

    // const {reset, ...cont} = {...content}
    // const {'reset': a, ...aut} = {...author}
    // const {'reset': b, ...inf} = {...info}