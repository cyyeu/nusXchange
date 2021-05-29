import React, { useState, useEffect } from 'react'
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
import validator from "validator"


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

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState("")
  

  const handleSubmit = (e) => {
    e.preventDefault()

    const payload = {
      email: email,
      password1: password,
      password2: password,
      first_name: firstName,
      last_name: lastName,
    }

    fetch('http://127.0.0.1:8000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            localStorage.clear()
            localStorage.setItem('token', data.key)
            history.push('/profile')});
        } else if (!res.ok) {
          setFirstName("")
          setLastName("")
          setEmail('')
          setPassword('')
          localStorage.clear()
          res.json().then(data => {alert(data.email)})
        }
      })
  }

  function validateEmail(email) {
    let regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return regex.test(email) ? "" : "Invalid Email.";
  }


  function validatePassword() {
    if (validator.isStrongPassword(password,{
       minLength: 8,
       minLowercase: 1,
       minUppercase: 0,
       minNumbers: 1,
       minSymbols: 0,})) {
      setErrors("");
      console.log(password, "jethroisdad");
    } else {
      setErrors("Password not Strong.");
      console.log(password, "cysmallkkj");
    }
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
                value={firstName}
                onBlur={(e) => setFirstName(e.target.value)}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={lastName}
                onBlur={(e) => setLastName(e.target.value)}
                onChange={(e) => setLastName(e.target.value)}
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
                value={email}
                onBlur={(e) => setEmail(e.target.value)}
                onChange={(e) => setEmail(e.target.value)}
                error = {validateEmail(email) !== ""}
                helperText = {validateEmail(email)}
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
                value={password}
                onBlur={validatePassword}
                onChange={(e) => setPassword(e.target.value)}
                error = {errors !== ""}
                helperText = {errors}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Confirm Password'
                type='password'
                id='password'
                autoComplete='none'
                value={confirmPassword}
                onBlur={(e) => setConfirmPassword(e.target.value)}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error = {confirmPassword !== password}
                helperText = {confirmPassword !== password ? "Password fields do not match." : ""}
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
            disabled = {validateEmail(email) || errors  || confirmPassword !== password  }
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
