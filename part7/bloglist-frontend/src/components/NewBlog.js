import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Grid } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const blog = { title, author, url }

    try {
      dispatch(addBlog(blog))
      props.toggleBlogForm()
      dispatch(
        setNotification(`a new blog '${blog.title}' by ${blog.author} added!`)
      )
    } catch (exception) {
      console.log(exception)
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const classes = useStyles()

  return (
    <Grid container style={{marginTop: '2rem'}}>
      <CssBaseline />
      <Grid item xs={false} sm={2} md={4} />
      <Grid item xs={12} component={Paper} sm={8} md={4}>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create new
          </Typography>
          <form className={classes.form} onSubmit={handleNewBlog}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              label="Author"
              name="author"
              fullWidth
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              label="Title"
              name="title"
              fullWidth
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              label="Url"
              name="url"
              fullWidth
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              autoFocus
            />

            <Button
              id="create"
              variant="contained"
              color="primary"
              type='submit'
              fullWidth
              className={classes.submit}
            >
              create
            </Button>
          </form>
        </div>
      </Grid>
      <Grid item xs={false} sm={2} md={4} />
    </Grid>
  )
}

export default NewBlog

// <div>
//   author
//   <input
//     id="author"
//     value={author}
//     onChange={({ target }) => setAuthor(target.value)}
//   />
// </div>
// <div>
//   title
//   <input
//     id="title"
//     value={title}
//     onChange={({ target }) => setTitle(target.value)}
//   />
// </div>
// <div>
//   url
//   <input
//     id="url"
//     value={url}
//     onChange={({ target }) => setUrl(target.value)}
//   />
// </div>
