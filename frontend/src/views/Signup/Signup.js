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
} from '@material-ui/core/'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import validator from 'validator'
import { useUserContext } from '../../contexts/UserContext'
import { CopyrightTwoTone } from '@material-ui/icons'

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Signup() {
  const classes = useStyles()
  const history = useHistory()
  const { dispatch } = useUserContext()
  const initForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const initErrors = {
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [form, setForm] = useState(initForm)
  const [errors, setErrors] = useState(initErrors)
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (name === 'email') {
      validateEmail(value)
    } else if (name === 'password') {
      validatePassword(value)
      validateConfirmPassword(value, form.confirmPassword)
    } else if (name === 'confirmPassword') {
      validateConfirmPassword(form.password, value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const payload = {
      email: form.email,
      password1: form.password,
      password2: form.password,
      first_name: form.firstName,
      last_name: form.lastName,
    }

    fetch('/api/auth/register', {
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
              user_id: data.user_id,
            },
          })
          history.push(`/profile/${data.user_id}`)
        })
      } else if (!res.ok) {
        res.json().then((data) => {
          if (data.email) {
            setErrors({ ...errors, email: data.email })
          }
          if (data.password1) {
            setErrors({ ...errors, password: data.password1 })
          }
        })
      }
    })
  }

  function validateEmail(email) {
    if (validator.isEmail(email)) {
      setErrors((prevErrors) => {
        return { ...prevErrors, email: '' }
      })
    } else {
      setErrors((prevErrors) => {
        return { ...prevErrors, email: 'Invalid email' }
      })
    }
  }

  function validatePassword(pw) {
    if (
      validator.isStrongPassword(pw, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      setErrors((prevErrors) => {
        return { ...prevErrors, password: '' }
      })
    } else {
      setErrors((prevErrors) => {
        return { ...prevErrors, password: 'Password not strong.' }
      })
    }
  }

  const validateConfirmPassword = (pw, confirmPw) => {
    if (pw === confirmPw) {
      setErrors((prevErrors) => {
        return { ...prevErrors, confirmPassword: '' }
      })
    } else {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          confirmPassword: 'Password fields do not match',
        }
      })
    }
  }

  const isSignUpDisabled = () => {
    return (
      errors.email !== '' ||
      errors.password !== '' ||
      errors.confirmPassword !== '' ||
      form.firstName === '' ||
      form.lastName === '' ||
      form.password === '' ||
      form.confirmPassword === '' ||
      form.email === ''
    )
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h2' variant='h4'>
          Sign Up
        </Typography>
        <form
          className={classes.form}
          id='signup'
          method='POST'
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required={true}
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                value={form.firstName}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
                value={form.lastName}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={form.email}
                onChange={handleFormChange}
                error={errors.email !== ''}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='none'
                value={form.password}
                onChange={handleFormChange}
                error={errors.password !== ''}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                autoComplete='none'
                value={form.confirmPassword}
                onChange={handleFormChange}
                error={errors.confirmPassword !== ''}
                helperText={errors.confirmPassword}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            form='signup'
            disabled={isSignUpDisabled()}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  )
}
