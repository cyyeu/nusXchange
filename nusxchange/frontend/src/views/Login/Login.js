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
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'

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
  const { dispatch } = useContext(UserContext)
  const initForm = {
    email: '',
    password: '',
    remember: false,
  }
  const [form, setForm] = useState(initForm)
  const [isInvalidLogin, setIsInvalidLogin] = useState(false)
  const handleInputChange = (event) => {
    const { name, value, checked } = event.target
    setForm({ ...form, [name]: name === 'remember' ? checked : value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      email: form.email,
      password: form.password,
    }

<<<<<<< HEAD
    fetch('/api/auth/login/', {
=======
    fetch('api/auth/login/', {
>>>>>>> master
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          dispatch({
            type: 'LOGIN',
            payload: {
              token: data.key,
              rememberMe: form.remember,
            },
          })
          history.push('/profile')
        })
      } else {
        setIsInvalidLogin(true)
        setForm(initForm)
      }
    })
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
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.remember}
                    onChange={handleInputChange}
                    name='remember'
                  />
                }
                label='Remember me'
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
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/signup' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
