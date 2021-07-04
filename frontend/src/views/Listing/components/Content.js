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
import { useUserContext } from '../../../contexts/UserContext'

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}
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
  const dates = listing.avail_dates
  const [DateObjects, setDateObjects] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const location = useLocation()
  const { id } = useParams()
  const { state } = useUserContext()
  const history = useHistory()

  function createDateObjects(dates) {
    var i = 0
    while (i < dates.length) {
      const date = new DateObject({
        date: dates[i],
        format: 'YYYY-MM-DD',
      })
      setDateObjects((DateObjects) => [...DateObjects, date])
      i++
    }
  }

  useEffect(() => {
    createDateObjects(dates)
  }, [])

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
      console.log(data)
      return
    }
    setDeleteSuccess(true)
    setTimeout(() => {
      history.goBack()
    }, 1000)
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
              <Calendar type='icon' value={DateObjects} />
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
      <Snackbar
        open={deleteSuccess}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert severity='info'>
          <AlertTitle>Success</AlertTitle>
          Successfully deleted listing!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Content
