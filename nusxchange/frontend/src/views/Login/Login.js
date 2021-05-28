import React from 'react';
import {useForm, Controller} from 'react-hook-form'  
import {Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container,FormControlLabel, Checkbox} from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';




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
}));



export default function Login() {
  const classes = useStyles();
  const {handleSubmit, control, errors: fieldsErrors, reset} = useForm()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login to nusXchange
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit((data)=> alert(JSON.stringify(data)))}>
        <Controller
              name="email"
              as={
                <TextField
                  id="email"
                  labelWidth={40}
                  helperText={fieldsErrors.email ? fieldsErrors.email.message : null}
                  variant="outlined"
                  label="Email"
                  error={fieldsErrors.email}
                />
              }
              control={control}
              defaultValue=""
              rules={{
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'invalid email address'
                }
              }}
            />
            <Controller
              name="password"
              as={
                <TextField
                  id="password"
                  type="password"
                  labelWidth={70}
                  helperText={fieldsErrors.password ? fieldsErrors.password.message : null}
                  variant="outlined"
                  label="Password"
                  error={fieldsErrors.password}
                />
              }
              control={control}
              defaultValue=""
              rules={{
                required: 'Required'
              }}
            />
          <FormControlLabel
            control={
              <Controller as={Checkbox} control={control} name="remember" color="primary" defaultValue={false}/>}
            label="Remember me"
          />
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
    </Container>
  );
}
