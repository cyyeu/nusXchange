import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  Divider,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Snackbar,
} from '@material-ui/core/'
import Calendar, { DateObject } from 'react-multi-date-picker'
import Rating from '@material-ui/lab/Rating'
import MuiAlert from '@material-ui/lab/Alert'
import { AlertTitle } from '@material-ui/lab'
import TxButton from './TxButton'
import { useLocation, Link, useParams, useHistory } from 'react-router-dom'
import { useUserContext, useSnackbarContext } from '../../../contexts'

const useStyles = makeStyles((theme) => ({
  page: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: theme.spacing(125),
    },
    marginTop: theme.spacing(3),
  },
  price: {
    fontSize: 20,
    fontWeight: 'fontWeightMedium',
  },
  ratingText: {
    fontSize: 18,
  },
  textField: {
    '& .MuiInputBase-root.Mui-disabled': {
      color: 'rgba(0, 0, 0, 0.8)',
    },
  },
}))

const Content = ({ listing }) => {
  const classes = useStyles()
  const location = useLocation()
  const { id } = useParams()
  const { state } = useUserContext()
  const { dispatch: dispatchSnackbar } = useSnackbarContext()
  const history = useHistory()
  listing.avail_dates = listing.avail_dates.map(
    (date) =>
      new DateObject({
        date,
        format: 'YYYY-MM-DD',
      })
  )

  // for delete bnutton
  const [openDialog, setOpenDialog] = useState(false)
  const handleDialog = () => {
    setOpenDialog(!openDialog)
  }
  const handleDelete = async () => {
    setOpenDialog(false)
    var token = 'Token ' + state.token
    var url = `/api/listings/${id}/`
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })

    if (!res.ok) {
      const data = await res.json()
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
        msg: 'Listing deleted',
      },
    })
    history.goBack()
  }

  return (
    <div className={classes.page}>
      <Paper elevation={2}>
        <Box m={3}>
          <Grid container direction='column' spacing={3}>
            <Grid item container justify='space-between' xs={12}>
              <Grid item>
                <Typography variant='h4' color='secondary'>
                  {listing.mod_code}
                </Typography>
              </Grid>
              <Grid item>
                {listing.owner.user == state.user_id && (
                  <ButtonGroup>
                    <Button
                      variant='outlined'
                      style={{ textTransform: 'none', fontSize: 16 }}
                      color='primary'
                      component={Link}
                      to={`${location.pathname}/edit`}
                      fullWidth
                    >
                      Edit
                    </Button>
                    <Button
                      variant='outlined'
                      style={{
                        textTransform: 'none',
                        fontSize: 16,
                      }}
                      color='primary'
                      onClick={handleDialog}
                      fullWidth
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                )}
              </Grid>
            </Grid>
            <Grid item container direction='row'>
              <Box mt={0.1}>
                <Grid item>
                  <Typography className={classes.rating} color='primary'>
                    {listing.avg_rating.toFixed(2)}
                  </Typography>
                </Grid>
              </Box>
              <Grid item>
                <Rating value={listing.avg_rating} precision={0.5} readOnly />
              </Grid>
            </Grid>
            <Grid item>
              <Typography className={classes.price} color='primary'>
                {listing.price ? '$' + listing.price + '/hr' : 'Free'}
              </Typography>
            </Grid>
            <Grid item>
              <Divider variant='middle' />
            </Grid>
            <Grid item>
              <Typography variant='h5' color='primary'>
                Description
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                className={classes.textField}
                fullWidth
                multiline={true}
                rows={10}
                value={listing.description}
                InputProps={{ disableUnderline: true }}
                disabled={true}
              />
            </Grid>
            <Grid item>
              <Typography variant='h5' color='primary'>
                Availability
              </Typography>
            </Grid>
            <Grid item>
              <Calendar type='icon' value={listing.avail_dates} />
            </Grid>
            <Grid item container>
              <TxButton />
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Dialog open={openDialog} onClose={handleDialog}>
        <DialogTitle>Confirm delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this listing?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Content
