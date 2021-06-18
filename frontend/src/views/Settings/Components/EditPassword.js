import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  Snackbar,
} from '@material-ui/core/'
import { useUserContext } from '../../../contexts/UserContext'
import validator from 'validator'
import Divider from '../../Home/components/Divider'
import MuiAlert from '@material-ui/lab/Alert'
import { AlertTitle } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(-2.4),
      width: theme.spacing(120),
      height: theme.spacing(85),
    },
  },
  form: {
    width: '66%',
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}))

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

export default function EditPassword() {
  const classes = useStyles()
  const { state } = useUserContext()
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
        return { ...prevErrors, password: 'New Password is not strong' }
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

  const isDisabled = () => {
    return (
      errors.password !== '' ||
      errors.confirmPassword !== '' ||
      form.password === '' ||
      form.confirmPassword === ''
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    var token = 'Token ' + state.token

    const payload = {
      new_password1: form.password,
      new_password2: form.password,
    }

    fetch('/api/auth/password/change/', {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.ok) {
        setOpen(true)
      } else {
        //console.log(token)
        setErrorSnackbar(true)
      }
    })
  }

  return (
    <div className={classes.paper}>
      <Container component='main' fixed>
        <Paper elevation={1}>
          <Box ml={2} pt={1}>
            <Typography
              component='h1'
              variant='h5'
              color='secondary'
              align='left'
            >
              Edit Password
            </Typography>
          </Box>
          <Divider />
          <form className={classes.form} onSubmit={handleSubmit} id='change'>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='New Password'
                  type='password'
                  id='password'
                  autoComplete='none'
                  value={form.password}
                  onChange={handleFormChange}
                  error={errors.password !== ''}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={10}>
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
              Width='66%'
              variant='contained'
              color='primary'
              className={classes.submit}
              form='change'
              disabled={isDisabled()}
            >
              Change Password
            </Button>
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
                Password successfully saved!
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
                Error changing password!
              </Alert>
            </Snackbar>
          </form>
        </Paper>
      </Container>
    </div>
  )
}
