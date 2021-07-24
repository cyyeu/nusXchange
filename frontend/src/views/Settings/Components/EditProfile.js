import React, { useState, useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  Snackbar,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core/'
import { useUserContext, useSnackbarContext } from '../../../contexts'
import Divider from '../../Home/components/Divider'
import MuiAlert from '@material-ui/lab/Alert'
import { AlertTitle } from '@material-ui/lab'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import validator from 'validator'
import { AdvancedImage, placeholder } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/base'
import { fill } from '@cloudinary/base/actions/resize'
import { max } from '@cloudinary/base/actions/roundCorners'
import { defaultImage } from '@cloudinary/base/actions/delivery'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail'
import useUser from '/src/hooks/useUser'

const useStyles = makeStyles((theme) => ({
  paper: {
    '& > *': {
      margin: theme.spacing(-2.4),
      width: theme.spacing(120),
      height: theme.spacing(85),
    },
  },
  form: {
    width: '66%', // Fix IE 11 issue.
    //marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
  avatar: {
    border: 0,
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}))

const EditProfile = () => {
  const classes = useStyles()
  const { state } = useUserContext()
  const initForm = {
    first_name: '',
    last_name: '',
    bio: '',
    avatar_id: '',
    tg_url: '',
    linkedin_url: '',
  }
  const initErrors = {
    tg_url: '',
    linkedin_url: '',
  }
  const [errors, setErrors] = useState(initErrors)
  const [form, setForm] = useState(initForm)
  const [loading, user] = useUser(state.user_id)
  const { dispatch } = useSnackbarContext()
  const [awaitingResponse, setAwaitingResponse] = useState(false)

  useEffect(() => {
    setForm({ ...form, ...user })
  }, [loading])

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'nusxchange',
    },
  })
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (name === 'tg_url') {
      validateTg(value)
    } else if (name === 'linkedin_url') {
      validateLinkedin(value)
    }
  }

  function validateTg(tg_url) {
    if (validator.isAlphanumeric(tg_url)) {
      setErrors((prevErrors) => {
        return { ...prevErrors, tg_url: '' }
      })
    } else {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          tg_url: 'Not a valid handle. Did you remove @?',
        }
      })
    }
  }

  function validateLinkedin(linkedin_url) {
    let linkedinRe =
      /(https?:\/\/(www.)|(www.))?linkedin.com\/(mwlite\/|m\/)?in\/[a-zA-Z0-9_.-]+\/?/
    if (linkedinRe.test(linkedin_url)) {
      setErrors((prevErrors) => {
        return { ...prevErrors, linkedin_url: '' }
      })
    } else {
      setErrors((prevErrors) => {
        return { ...prevErrors, linkedin_url: 'Not a valid Linkedin.' }
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setAwaitingResponse(true)
    const payload = {
      first_name: form.first_name,
      last_name: form.last_name,
      bio: form.bio,
      avatar_id: form.avatar_id,
      linkedin_url: form.linkedin_url,
      tg_url: form.tg_url,
    }
    const res = await fetch(`/api/user/${state.user_id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Token ${state.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      dispatch({
        type: 'SUCCESS',
        payload: {
          msg: 'Profile saved',
        },
      })
    } else {
      const data = await res.json()
      dispatch({
        type: 'ERROR',
        payload: {
          msg: data,
        },
      })
    }
    setAwaitingResponse(false)
  }

  //handle upload to cloudinary API and update backend with Id
  const handleUpload = async (e) => {
    e.preventDefault()
    setAwaitingResponse(true)
    // upload file to cloudinary
    const cldUrl = 'https://api.cloudinary.com/v1_1/nusxchange/upload'
    const formData = new FormData()
    var file = e.target.files[0]
    formData.append('file', file)
    formData.append('upload_preset', 'xtgswhai')
    const res = await fetch(cldUrl, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()

    if (res.ok) {
      // upload was successfuly, update avatar id in db
      console.log(data)
      const profile_img = cld.image(data.public_id)
      profile_img.delivery(defaultImage('default'))
      profile_img.resize(fill().width(150).height(150)).roundCorners(max())
      setForm({ ...form, avatar_id: data.public_id, profile_img })

      const payload = {
        avatar_id: data.public_id,
      }
      const res = await fetch(`/api/user/${state.user_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${state.token}`,
        },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        dispatch({
          type: 'SUCCESS',
          payload: {
            msg: 'Avatar saved',
          },
        })
      } else {
        const data = await res.text()
        dispatch({
          type: 'ERROR',
          payload: {
            msg: data,
          },
        })
      }
    } else {
      //console.log(token)
      const data = await res.text()
      dispatch({
        type: 'ERROR',
        payload: {
          msg: data,
        },
      })
    }
    setAwaitingResponse(false)
  }

  return (
    <div className={classes.paper}>
      <Container component='main' maxWidth='lg'>
        <Paper elevation={1}>
          <Box ml={2} pt={1}>
            <Typography component='h1' variant='h5' color='secondary'>
              Edit Profile
            </Typography>
          </Box>
          <Divider />
          <Box p={2}>
            <AdvancedImage cldImg={form.profile_img} />
            <input
              type='file'
              accept='image/*'
              onChange={handleUpload}
              style={{ display: 'none' }}
              id='icon-button-file'
            />
            <Grid item container xs={6} spacing={1}>
              <Grid item xs={1}>
                <label htmlFor='icon-button-file'>
                  <IconButton
                    color='primary'
                    aria-label='upload picture'
                    component='span'
                    onChange={handleUpload}
                    disabled={awaitingResponse}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Grid>
              <Grid item>
                {awaitingResponse && (
                  <Box ml={2} mt={2}>
                    <CircularProgress color='secondary' size='1rem' />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
          <form className={classes.form} onSubmit={handleSubmit} id='change'>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='fname'
                  name='first_name'
                  variant='standard'
                  fullWidth
                  id='firstName'
                  label='First Name'
                  value={form.first_name}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='standard'
                  fullWidth
                  name='last_name'
                  label='Last Name'
                  id='LastName'
                  autoComplete='lname'
                  value={form.last_name}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='standard'
                  fullWidth
                  name='bio'
                  label='Bio'
                  id='bio'
                  autoComplete='lname'
                  value={form.bio}
                  onChange={handleFormChange}
                  multiline={true}
                  rows={8}
                  rowsMax={12}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant='standard'
                  fullWidth
                  name='linkedin_url'
                  label='Linkedin Profile Link'
                  id='linkedin_url'
                  autoComplete='linkedin'
                  value={form.linkedin_url}
                  onChange={handleFormChange}
                  helperText={errors.linkedin_url}
                  error={errors.linkedin_url !== ''}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant='standard'
                  fullWidth
                  name='tg_url'
                  label='Telegram Handle'
                  id='tg_url'
                  autoComplete='tele'
                  value={form.tg_url}
                  onChange={handleFormChange}
                  helperText={errors.tg_url}
                  error={errors.tg_url !== ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AlternateEmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Box mt={10} />
              <Grid
                item
                container
                justify='flex-start'
                alignItems='flex-end'
                spacing={2}
              >
                <Grid item>
                  <Button
                    type='submit'
                    Width='66%'
                    variant='contained'
                    color='primary'
                    form='change'
                    disabled={awaitingResponse}
                  >
                    Save Changes
                  </Button>
                </Grid>
                <Grid item>
                  {awaitingResponse && (
                    <CircularProgress color='secondary' size='2rem' />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  )
}

export default EditProfile
