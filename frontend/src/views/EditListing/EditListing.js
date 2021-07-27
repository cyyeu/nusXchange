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
  Snackbar,
  Divider,
  InputAdornment,
} from '@material-ui/core/'
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from 'styled-components'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import { useHistory, useParams } from 'react-router-dom'
import useListing from '../../hooks/useListing'
import { useUserContext, useSnackbarContext } from '../../contexts'
import { validateMod, validatePrice } from '../../utils'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: theme.spacing(120),
      height: theme.spacing(90),
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
  pricebuttons: {
    textTransform: 'none',
    fontSize: 16,
  },
  submit: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    padding: theme.spacing(2),
  },
}))

const EditListing = () => {
  const classes = useStyles()
  const { id } = useParams()
  const [loading, listing] = useListing(id)
  const initForm = {
    mod_code: '',
    desc: '',
    price: '',
    avail_dates: [],
  }
  const initErrors = {
    mod_code: '',
    price: '',
  }
  const [form, setForm] = useState(initForm)
  const [errors, setErrors] = useState(initErrors)
  const [disablePrice, setdisablePrice] = useState(true)
  const [awaitingResponse, setAwaitingResponse] = useState(false)
  const { state } = useUserContext()
  const { dispatch: dispatchSnackbar } = useSnackbarContext()
  const history = useHistory()

  useEffect(() => {
    console.log(listing)
    if (!loading && state.user_id != Number(listing.owner.user)) {
      history.goBack()
    }
    setForm((form) => {
      return {
        mod_code: listing.mod_code,
        desc: listing.desc,
        price: listing.price,
        avail_dates: listing.avail_dates.map(
          (date) =>
            new DateObject({
              date,
              format: 'YYYY-MM-DD',
            })
        ),
      }
    })
  }, [id, loading])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (name === 'mod_code') {
      validateMod(value, setErrors)
    } else if (name === 'price') {
      validatePrice(value, setErrors)
    }
  }

  const isDisabled = () => {
    return errors.mod_code !== '' || errors.price !== '' || form.mod_code === ''
  }

  const handleSubmit = async (e) => {
    setAwaitingResponse(true)
    e.preventDefault()
    const payload = {
      mod_code: form.mod_code.toUpperCase(),
      description: form.desc,
      price: form.price,
      avail_dates: form.avail_dates.map((date) => date.format('YYYY-MM-DD')),
    }
    var token = 'Token ' + state.token
    var url = `/api/listings/${id}/`
    const res = await fetch(url, {
      method: 'PATCH',
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
      return
    }

    dispatchSnackbar({
      type: 'SUCCESS',
      payload: {
        msg: 'Listing saved!',
      },
    })
    history.push(`/listing/${id}`)
  }

  return (
    <>
      <CustomGrid
        container
        justify='center'
        alignItems='flex-start'
        spacing={1}
      >
        <div className={classes.paper}>
          <Paper elevation={3}>
            <Grid container direction='column' spacing={2}>
              <Grid item container>
                <Box ml={4} pt={1}>
                  <Typography variant='h4' color='secondary'>
                    Edit listing
                  </Typography>
                </Box>
              </Grid>
              <Grid item container spacing={2} direction='row'>
                <Box ml={5} pt={1}>
                  <Grid item lg={6}>
                    <Button
                      className={classes.pricebuttons}
                      variant='outlined'
                      onClick={() => {
                        setdisablePrice(true)
                        setForm((form) => {
                          return { ...form, price: 0 }
                        })
                        setErrors((prevErrors) => {
                          return { ...prevErrors, price: '' }
                        })
                      }}
                    >
                      Free
                    </Button>
                  </Grid>
                </Box>
                <Grid item lg={6}>
                  <Button
                    className={classes.pricebuttons}
                    variant='outlined'
                    onClick={() => {
                      setdisablePrice(false)
                    }}
                  >
                    Paid
                  </Button>
                </Grid>
              </Grid>
              <form
                className={classes.form}
                onSubmit={handleSubmit}
                id='listing'
              >
                <Grid item container lg={12} direction='column' spacing={2}>
                  <Grid item container spacing={2} direction='row'>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name='mod_code'
                        variant='outlined'
                        id='mod_code'
                        label='Module Code'
                        value={form.mod_code}
                        placeholder='CS2100'
                        onChange={handleFormChange}
                        color='secondary'
                        helperText={errors.mod_code}
                        error={errors.mod_code !== ''}
                        autoFocus
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name='price'
                        variant='outlined'
                        id='price'
                        label='Price'
                        value={form.price}
                        placeholder='10'
                        onChange={handleFormChange}
                        color='secondary'
                        helperText={errors.price}
                        error={errors.price !== ''}
                        disabled={disablePrice}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <AttachMoneyIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      name='desc'
                      variant='outlined'
                      id='desc'
                      label='Description'
                      value={form.desc}
                      onChange={handleFormChange}
                      color='secondary'
                      placeholder='Introduce yourself and include any details students might be interested in.'
                      multiline={true}
                      rows={8}
                      rowsMax={10}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <Box mt={2}>
                    <Typography variant='body1' color='primary'>
                      Available dates
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <DatePicker
                    value={form.avail_dates}
                    onChange={(dates) =>
                      setForm({ ...form, avail_dates: dates })
                    }
                    multiple
                    minDate={new Date()}
                    format='YYYY-MM-DD'
                    type='icon'
                    name='avail_dates'
                  />
                </Grid>
                <Box mt={3}>
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
                        disabled={isDisabled() || awaitingResponse}
                      >
                        Save
                      </Button>
                    </Grid>
                    <Grid item>
                      {awaitingResponse && (
                        <CircularProgress color='secondary' size='2rem' />
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Grid>
          </Paper>
        </div>
      </CustomGrid>
    </>
  )
}

const CustomGrid = styled(Grid)`
  margin: 100px auto 0 auto;
`
export default EditListing
