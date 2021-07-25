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
} from '@material-ui/core/'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { makeStyles } from '@material-ui/core/styles'
import validator from 'validator'
import { useSnackbarContext } from '../../contexts/SnackbarContext'

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
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function ForgotPassword() {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const { dispatch } = useSnackbarContext()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const payload = {
      email,
    }
    try {
      const res = await fetch('/api/password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok) {
        dispatch({
          type: 'SUCCESS',
          payload: {
            msg: 'Email sent! Please check your inbox and/or junk mail.',
          },
        })
      } else {
        console.log(data)
        dispatch({
          type: 'ERROR',
          payload: {
            msg: data.detail,
          },
        })
      }
    } catch (e) {
      console.log(e)
      dispatch({
        type: 'ERROR',
        payload: {
          msg: JSON.stringify(e),
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInput = (e) => {
    const email = e.target.value
    setError(email && validator.isEmail(email) ? '' : 'Invalid email')
    setEmail(email)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Forgot Password
        </Typography>
        <form id='forgot' className={classes.form} onSubmit={handleSubmit}>
          <Grid container direction='column' spacing={1}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                label='Registered Email'
                id='email'
                value={email}
                onChange={handleInput}
                error={error !== ''}
                helperText={error}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            form='forgot'
            disabled={error !== '' || isLoading}
          >
            Send Password Reset Email
          </Button>
        </form>
      </div>
    </Container>
  )
}
