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
} from '@material-ui/core/'
import { useUserContext } from '../../../contexts/UserContext'
import Divider from '../../Home/components/Divider'
import MuiAlert from '@material-ui/lab/Alert'
import { AlertTitle } from '@material-ui/lab'
import PhotoCamera from '@material-ui/icons/PhotoCamera'

import { AdvancedImage, placeholder } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/base'
import { fill } from '@cloudinary/base/actions/resize'
import { max } from '@cloudinary/base/actions/roundCorners'
import { defaultImage } from '@cloudinary/base/actions/delivery'

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

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

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

  const [form, setForm] = useState(initForm)
  const [open, setOpen] = useState(false)
  const [errorSnackbar, setErrorSnackbar] = useState(false)
  const token = 'Token ' + state.token
  const url = `/api/user/${state.user_id}`

  useEffect(() => {
    loadData()
    //console.log(userInfo.first_name);
  }, [])

  const loadData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setForm({
          ...form,
          first_name: data.first_name,
          last_name: data.last_name,
          bio: data.bio,
          avatar_id: data.avatar_id,
          tg_url: data.tg_url,
          linkedin_url: data.linkedin_url,
        })
      })
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const payload = {
      first_name: form.first_name,
      last_name: form.last_name,
      bio: form.bio,
      avatar_id: form.avatar_id,
      linkedin_url: form.linkedin_url,
      tg_url: form.tg_url,
    }
    fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.ok) {
        setOpen(true)
      } else {
        setErrorSnackbar(true)
        res.text().then((text) => alert(text))
      }
    })
  }

  //handle snackbar closing
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    setErrorSnackbar(false)
  }

  //handle upload to cloudinary API and update backend with Id
  const handleUpload = (e) => {
    e.preventDefault()
    const cldUrl = 'https://api.cloudinary.com/v1_1/nusxchange/upload'
    const formData = new FormData()
    var file = e.target.files[0]
    formData.append('file', file)
    formData.append('upload_preset', 'xtgswhai')
    fetch(cldUrl, {
      method: 'POST',
      body: formData,
    }).then((res) => {
      if (res.ok) {
        setOpen(true)
        //res.text().then(text => alert(text))
        res.json().then((data) => {
          setForm({ ...form, avatar_id: data.public_id })
          var data = { avatar_id: data.public_id }
          fetch(url, {
            method: 'PATCH',
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
        })
      } else {
        //console.log(token)
        res.text().then((text) => alert(text))
      }
    })
  }

  //cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'nusxchange',
    },
  })

  const profile_img =
    form.avatar_id === '' ? cld.image('default') : cld.image(form.avatar_id)
  profile_img.delivery(defaultImage('default'))
  profile_img.resize(fill().width(128).height(128)).roundCorners(max())

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
            <AdvancedImage cldImg={profile_img} />
            <input
              type='file'
              accept='image/*'
              onChange={handleUpload}
              style={{ display: 'none' }}
              id='icon-button-file'
            />
            <label htmlFor='icon-button-file'>
              <IconButton
                color='primary'
                aria-label='upload picture'
                component='span'
                onChange={handleUpload}
              >
                <PhotoCamera />
              </IconButton>
            </label>
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
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant='standard'
                  fullWidth
                  name='tg_url'
                  label='Telegram handle'
                  placeholder='Please do not add the @ infront of your username!'
                  id='tg_url'
                  autoComplete='tele'
                  value={form.tg_url}
                  onChange={handleFormChange}
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
            >
              Save Changes
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
                Profile successfully saved!
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
                Error changing profile!
              </Alert>
            </Snackbar>
          </form>
        </Paper>
      </Container>
    </div>
  )
}

export default EditProfile
