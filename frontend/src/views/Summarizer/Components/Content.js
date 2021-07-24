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
  Divider,
  IconButton,
  Modal,
} from '@material-ui/core/'
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined'
import MuiAlert from '@material-ui/lab/Alert'
import { AlertTitle } from '@material-ui/lab'
import InfoModal from './InfoModal'
import validator from 'validator'

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: theme.spacing(150),
      height: theme.spacing(95),
    },
    marginTop: theme.spacing(-3),
    marginLeft: theme.spacing(-2),
  },
  form: {
    width: '90%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textbox: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    height: theme.spacing(75),
  },
  inputText: {
    width: '95%',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  outputTextField: {
    '& .MuiInputBase-root.Mui-disabled': {
      color: 'rgba(0, 0, 0, 0.7)',
    },
  },
  outputText: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}))

const Content = () => {
  const classes = useStyles()
  const initForm = {
    num_sentences: 10,
    min_length: 40,
    max_length: 500,
    input_text: '',
    url: '',
  }
  const initErrors = {
    num_sentences: '',
    min_length: '',
    max_length: '',
    url: '',
  }
  const [errors, setErrors] = useState(initErrors)
  const [form, setForm] = useState(initForm)
  const [summary, setSummary] = useState('Summarized content goes here.')
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openError, setOpenError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [awaitingResponse, setAwaitingResponse] = useState(false)

  //handle snackbar closing
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSuccess(false)
    setOpenError(false)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (name === 'num_sentences') {
      validateSentences(value)
    } else if (name === 'min_length') {
      validateMin(value, form.max_length)
    } else if (name === 'max_length') {
      validateMax(form.min_length, value)
    } else if (name === 'url') {
      validateUrl(value)
    }
  }

  function validateSentences(value) {
    if (value > 0) {
      setErrors((prevErrors) => {
        return { ...prevErrors, num_sentences: '' }
      })
    } else {
      setErrors((prevErrors) => {
        return { ...prevErrors, num_sentences: 'Invalid input.' }
      })
    }
  }

  function validateUrl(value) {
    if (validator.isURL(value)) {
      setErrors((prevErrors) => {
        return { ...prevErrors, url: '' }
      })
    } else {
      setErrors((prevErrors) => {
        return { ...prevErrors, url: 'Invalid url.' }
      })
    }
  }

  const validateMin = (min, max) => {
    if (min > 0 && min <= max) {
      setErrors((prevErrors) => {
        return { ...prevErrors, min_length: '' }
      })
    } else {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          min_length: 'Invalid input.',
        }
      })
    }
  }

  const validateMax = (min, max) => {
    if (max > 0 && max >= min) {
      setErrors((prevErrors) => {
        return { ...prevErrors, max_length: '' }
      })
    } else {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          max_length: 'Invalid input.',
        }
      })
    }
  }

  const isDisabled = () => {
    return (
      errors.url !== '' ||
      errors.min_length !== '' ||
      errors.max_length !== '' ||
      errors.num_sentences !== ''
    )
  }

  const handleDocument = () => {
    setOpenSuccess(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setAwaitingResponse(true)
    if (form.url === '') {
      const smrzr_url = `https://api.smrzr.io/v1/summarize?num_sentences=${form.num_sentences}&algorithm=kmeans&min_length=${form.min_length}&max_length=${form.max_length}`
      const res = await fetch(smrzr_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: form.input_text,
      })
      const data = await res.json()
      console.log(data)
      if (res.ok) {
        setSummary(data.summary)
      } else {
        setErrorMsg(data.message)
        setOpenError(true)
      }
    } else {
      const smrzr_url = `https://api.smrzr.io/v1/summarize/news?num_sentences=${form.num_sentences}&algorithm=kmeans&min_length=${form.min_length}&max_length=${form.max_length}`
      const payload = { url: form.url }
      const res = await fetch(smrzr_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      console.log(data)
      if (res.ok) {
        setSummary(data.summary)
      } else {
        setErrorMsg(data.message)
        setOpenError(true)
      }
    }
    setAwaitingResponse(false)
  }

  return (
    <div className={classes.paper}>
      <Paper elevation={5}>
        <form onSubmit={handleSubmit} id='summarize'>
          <Grid container direction='column'>
            <Grid
              item
              container
              alignItems='flex-start'
              xs={12}
              lg={12}
              direction='row'
            >
              <Grid item container xs={6} lg={6}>
                <Box ml={1} pt={3}>
                  <Typography variant='h4' color='secondary'>
                    Summarizer
                  </Typography>
                </Box>
                <Box pt={3}>
                  <Grid item xs={2}>
                    <InfoModal />
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.form}>
                  <Grid
                    container
                    direction='row'
                    justify='flex-start'
                    spacing={5}
                    alignItems='center'
                  >
                    <Grid item xs={4}>
                      <TextField
                        name='max_length'
                        variant='standard'
                        id='max_length'
                        label='Max Length'
                        value={form.max_length}
                        onChange={handleFormChange}
                        size='small'
                        color='secondary'
                        helperText={
                          errors.max_length === ''
                            ? 'Recommended: 500'
                            : errors.max_length
                        }
                        error={errors.max_length !== ''}
                        required
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        name='min_length'
                        variant='standard'
                        id='min_length'
                        label='Min Length'
                        value={form.min_length}
                        onChange={handleFormChange}
                        size='small'
                        color='secondary'
                        helperText={
                          errors.min_length === ''
                            ? 'Recommended: 40'
                            : errors.min_length
                        }
                        error={errors.min_length !== ''}
                        required
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        name='num_sentences'
                        variant='standard'
                        id='num_sentences'
                        label='Output Sentences'
                        value={form.num_sentences}
                        onChange={handleFormChange}
                        size='small'
                        color='secondary'
                        helperText={
                          errors.num_sentences === ''
                            ? 'Recommended: 10'
                            : errors.num_sentences
                        }
                        error={errors.num_sentences !== ''}
                        required
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item container md={12} direction='row'>
              <Grid item md={6}>
                <div className={classes.inputText}>
                  <TextField
                    name='input_text'
                    id='input_text'
                    placeholder='Paste or write text here.'
                    value={form.input_text}
                    onChange={handleFormChange}
                    fullWidth
                    multiline={true}
                    rows={30}
                    InputProps={{ disableUnderline: true }}
                    disabled={form.url !== ''}
                  />
                </div>
              </Grid>
              <Grid item>
                <Divider orientation='vertical' />
              </Grid>
              <Grid item md={5}>
                <div className={classes.outputText}>
                  <TextField
                    className={classes.outputTextField}
                    fullWidth
                    multiline={true}
                    rows={30}
                    value={summary}
                    InputProps={{ disableUnderline: true }}
                    disabled={true}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid
              item
              container
              justify='flex-start'
              alignItems='flex-start'
              direction='row'
            >
              <Grid item container lg={6}>
                <Grid item lg={2}>
                  <Box mt={1} ml={2}>
                    <input
                      type='file'
                      accept='.pdf'
                      onChange={handleDocument}
                      style={{ display: 'none' }}
                      id='icon-button-file'
                    />
                    <label htmlFor='icon-button-file'>
                      <IconButton
                        color='primary'
                        aria-label='upload pdf'
                        component='span'
                        onChange={handleDocument}
                        size='medium'
                      >
                        <CloudUploadOutlinedIcon />
                      </IconButton>
                    </label>
                  </Box>
                </Grid>
                <Grid item lg={7}>
                  <TextField
                    name='url'
                    variant='standard'
                    fullWidth
                    id='url'
                    label='...Or Paste Link to News Article'
                    value={form.url}
                    onChange={handleFormChange}
                    size='small'
                    color='secondary'
                    disabled={form.input_text !== ''}
                    error={errors.url !== ''}
                    helperText={errors.url}
                  />
                </Grid>
                <Grid item lg={3}>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    form='summarize'
                    disabled={awaitingResponse || isDisabled()}
                    className={classes.submit}
                    onClick={handleSubmit}
                  >
                    Summarize
                  </Button>
                  <Snackbar
                    open={openSuccess}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <Alert onClose={handleClose} severity='info'>
                      <AlertTitle>Success</AlertTitle>
                      Document uploaded.
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    open={openError}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <Alert onClose={handleClose} severity='error'>
                      <AlertTitle>Error!</AlertTitle>
                      {errorMsg}
                    </Alert>
                  </Snackbar>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  )
}

export default Content
