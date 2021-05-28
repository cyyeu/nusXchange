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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

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
  const context = useContext()
  const initForm = {
    email: '',
    password: '',
    remember: false,
  }
  const [form, setForm] = useState(initForm)
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

    fetch('http://127.0.0.1:8000/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.key) {
          localStorage.clear()
          localStorage.setItem('token', data.key)
          context.user
          history.push('/profile')
        } else {
          setForm(initForm)
          localStorage.clear()
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
              <Link href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
