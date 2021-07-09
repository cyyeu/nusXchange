import React, { useState } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  Snackbar,
} from '@material-ui/core/'
import { Alert, AlertTitle } from '@material-ui/lab'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, useParams } from 'react-router-dom'
import validator from 'validator'

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

export default function PasswordReset() {
  const classes = useStyles()
  const history = useHistory()
  const { uid, token } = useParams()
  const initForm = {
    password: '',
    confirmPassword: '',
  }
  const initErrors = {
    password: '',
    confirmPassword: '',
  }
  const [form, setForm] = useState(initForm)
  const [errors, setErrors] = useState(initErrors)
  const [errorResponse, setErrorResponse] = useState('')
  const [open, setOpen] = useState(false)
  const [errorSnackbar, setErrorSnackbar] = useState(false)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
    setErrorSnackbar(false)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (name === 'password') {
      validatePassword(value)
      validateConfirmPassword(value, form.confirmPassword)
    } else if (name === 'confirmPassword') {
      validateConfirmPassword(form.password, value)
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
        return {
          ...prevErrors,
          password: 'Please use a 8 character Alphanumeric password!',
        }
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
      errors.password !== '' ||
      errors.confirmPassword !== '' ||
      form.confirmPassword === '' ||
      form.password === ''
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      new_password1: form.password,
      new_password2: form.confirmPassword,
      uid,
      token,
    }

    const res = await fetch('/api/password-reset-confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (res.ok) {
      setOpen(true)
      setTimeout(() => {
        history.push('/login')
      }, 2000)
    } else {
      console.log(data)
      setErrorResponse(data.new_password2)
      setErrorSnackbar(true)
    }
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Reset Password
        </Typography>
        <form id='reset' className={classes.form} onSubmit={handleSubmit}>
          <Grid container direction='column' spacing={1}>
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
            form='reset'
            disabled={isSignUpDisabled()}
          >
            Reset
          </Button>
        </form>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert onClose={handleClose} severity='success'>
          <AlertTitle>Success</AlertTitle>
          Successfully reset password! Redirecting you to login...
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert onClose={handleClose} severity='error'>
          <AlertTitle>Error</AlertTitle>
          {errorResponse}
        </Alert>
      </Snackbar>
    </Container>
  )
}
