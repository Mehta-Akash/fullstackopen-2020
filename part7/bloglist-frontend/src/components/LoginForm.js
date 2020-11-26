import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'

import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()
  const dispatch = useDispatch()

  const classes = useStyles()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(userLogin({ username, password }))
    setUsername('')
    setPassword('')
    history.push('/')
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign into Blog App
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              name="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
    // <div>
    //   <form onSubmit={handleLogin}>
    //     <div>
    //       {/* username */}
    //       <TextField
    //         label="Username"
    //         variant="outlined"
    //         id="username"
    //         value={username}
    //         onChange={({ target }) => setUsername(target.value)}
    //       />
    //       {/* <input
    //         id="username"
    //         value={username}
    //         onChange={({ target }) => setUsername(target.value)}
    //       /> */}
    //     </div>
    //     <div>
    //       {/* password */}
    //       <TextField
    //         label="Password"
    //         variant="outlined"
    //         id="password"
    //         value={password}
    //         type="password"
    //         onChange={({ target }) => setPassword(target.value)}
    //       />
    //       {/* <input
    //         id="password"
    //         value={password}
    //         type="password"
    //         onChange={({ target }) => setPassword(target.value)}
    //       /> */}
    //     </div>
    //     <button id="login">login</button>
    //   </form>
    // </div>
  )
}

export default LoginForm

//   const user = await loginService.login({
//     username,
//     password,
//   })
