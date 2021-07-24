import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
} from '@material-ui/core/'
import { Rating } from '@material-ui/lab'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { useUserContext, useSnackbarContext } from '../../contexts'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: theme.spacing(120),
      height: theme.spacing(60),
    },
    marginTop: theme.spacing(-3),
    marginLeft: theme.spacing(2),
  },
  form: {
    width: '90%',
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
}))

const CreateReview = () => {
  const classes = useStyles()
  const initForm = {
    desc: '',
    rating: null,
  }
  const [form, setForm] = useState(initForm)
  const [maxLimit, setMaxLimit] = useState('')
  const [awaitingResponse, setAwaitingResponse] = useState(false)
  const { id } = useParams()
  const history = useHistory()
  const { state } = useUserContext()
  const { dispatch: dispatchSnackbar } = useSnackbarContext()

  useEffect(async () => {
    const res = await fetch(`/api/tx/${id}/status/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + state.token,
      },
    })
    const data = await res.json()
    if (
      !res.ok ||
      data.user_type != 'student' ||
      !data.is_accepted ||
      data.gave_review
    ) {
      history.goBack()
    }
  }, [id])
  const handleFormChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
    if (name === 'desc') {
      if (value.length >= 400) {
        setMaxLimit('Reached max limit of 400 characters')
      } else {
        setMaxLimit('')
      }
    }
  }
  const isDisabled = () => {
    return !form.rating
  }
  const handleSubmit = async () => {
    setAwaitingResponse(true)
    const payload = {
      listing: id,
      rating: form.rating,
      description: form.desc,
    }
    var token = 'Token ' + state.token
    var url = '/api/reviews/'
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    setAwaitingResponse(false)
    if (!res.ok) {
      dispatchSnackbar({
        type: 'ERROR',
        payload: {
          msg: data,
        },
      })
    }
    dispatchSnackbar({
      type: 'SUCCESS',
      payload: {
        msg: 'Review created!',
      },
    })
    history.goBack()
  }
  return (
    <CustomGrid container justify='center' alignItems='flex-start' spacing={1}>
      <div className={classes.paper}>
        <Paper elevation={3}>
          <Grid container direction='column' spacing={2}>
            <Grid item container>
              <Box ml={4} pt={4}>
                <Typography variant='h4' color='secondary'>
                  Leave a review
                </Typography>
              </Box>
            </Grid>
            <div className={classes.form}>
              <Grid item container>
                <TextField
                  fullWidth
                  name='desc'
                  variant='outlined'
                  id='desc'
                  label='Description'
                  value={form.desc}
                  onChange={handleFormChange}
                  color='secondary'
                  placeholder='Give a brief description of your overall experience with your tutor'
                  multiline={true}
                  helperText={maxLimit}
                  rows={5}
                  rowsMax={10}
                  inputProps={{ maxLength: 400 }}
                />
              </Grid>
              <Grid item container>
                <Box pt={4}>
                  <Typography variant='body1'>Rating</Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box ml={-0.2} mt={0.5}>
                  <Rating
                    name='rating'
                    value={form.rating}
                    onChange={(event, newValue) => {
                      setForm({ ...form, rating: newValue })
                    }}
                  />
                </Box>
              </Grid>
              <Box mb={5} />
              <Grid
                item
                container
                justify='flex-start'
                alignItems='flex-end'
                spacing={2}
              >
                <Grid item>
                  <Button
                    variant='outlined'
                    type='submit'
                    form='listing'
                    className={classes.submit}
                    disabled={isDisabled() || awaitingResponse}
                    onClick={handleSubmit}
                  >
                    Create
                  </Button>
                </Grid>
                <Grid item>
                  {awaitingResponse && (
                    <CircularProgress color='secondary' size='2rem' />
                  )}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Paper>
      </div>
    </CustomGrid>
  )
}

const CustomGrid = styled(Grid)`
  margin: 100px auto 0 auto;
`
export default CreateReview
