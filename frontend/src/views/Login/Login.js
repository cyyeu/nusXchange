import React, { useState, useContext } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core/'
import { Alert } from '@material-ui/lab'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, Link as RouterLink } from 'react-router-dom'
import { useUserContext } from '../../contexts/UserContext'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

export default function Login() {
  const classes = useStyles()
  const history = useHistory()
  const { dispatch } = useUserContext()
  const initForm = {
    email: '',
    password: '',
  }
  const [form, setForm] = useState(initForm)
  const [isInvalidLogin, setIsInvalidLogin] = useState(false)
  const [awaitingResponse, setAwaitingResponse] = useState(false)
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setAwaitingResponse(true)
    const payload = {
      email: form.email,
      password: form.password,
    }

    const res = await fetch('/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (res.ok) {
      dispatch({
        type: 'LOGIN',
        payload: {
          token: data.key,
          user_id: data.user_id,
        },
      })
      history.push(`/profile/${data.user_id}`)
    } else {
      setIsInvalidLogin(true)
      setForm(initForm)
      console.log(data)
    }

    setAwaitingResponse(false)
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login to nusXchange
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container direction='column' spacing={1}>
            <Grid item xs={12}>
              <TextField
                id='email'
                // helperText
                fullWidth
                variant='outlined'
                label='Email'
                // error
                name='email'
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='password'
                type='password'
                // helperText
                fullWidth
                variant='outlined'
                label='Password'
                // error
                name='password'
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          {isInvalidLogin && (
            <Alert severity='error' variant='outlined'>
              Invalid email or password!
            </Alert>
          )}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleSubmit}
            disabled={awaitingResponse}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                variant='body2'
                component={RouterLink}
                to='/forgot-password'
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link variant='body2' component={RouterLink} to='/signup'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
