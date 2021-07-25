import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  Box,
  Typography,
  IconButton,
  Divider,
  Dialog,
  Grid,
  DialogTitle,
  DialogContent,
} from '@material-ui/core/'
import TelegramIcon from '@material-ui/icons/Telegram'
import Calendar, { DateObject } from 'react-multi-date-picker'
import StarIcon from '@material-ui/icons/Star'
import { useHistory, Link } from 'react-router-dom'
import { useUserContext } from '../../../contexts/UserContext'
import Tx from '../../Listing/components/Tx'

const useStyles = makeStyles({
  root: {
    width: 220,
    height: 250,
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.1)',
  },
  mod: {
    fontSize: 14,
  },
  date: {
    fontSize: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'fontWeightMedium',
  },
})

const ListingCard = ({ listing }) => {
  const classes = useStyles()
  const history = useHistory()
  const { state } = useUserContext()
  const dates = listing.avail_dates
  const [DateObjects, setDateObjects] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoadingStudents, setIsLoadingStudents] = useState(true)
  const [txs, setTxs] = useState([])

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

  const handleCardClick = () => {
    history.push(`/listing/${listing.id}`)
  }

  const price = listing.price === 0 ? 'Free' : `${listing.mod_price}/Hr`
  // calculate relative days from current time
  const date = new Date(listing.date_created.slice(0, -1))
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

  const renderSocials = () => {
    return (
      <>
        {' '}
        <Grid item container xs={12} sm={6}>
          <Box ml={-0.5} mt={-0.5}>
            <IconButton
              color='primary'
              component='span'
              onClick={() =>
                window.open(`https://t.me/${listing.owner.tg_url}`, '_blank')
              }
              disabled={listing.owner.tg_url === ''}
            >
              <TelegramIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          alignItems='center'
          justify='flex-end'
        >
          <Calendar
            type='icon'
            value={DateObjects}
            mapDays={({ date, selectedDate, isSameDate }) => {
              let props = { disabled: true }
              if (typeof selectedDate === 'DateObject') {
                if (isSameDate(date, selectedDate)) {
                  props.style = {
                    color: 'white',
                    backgroundColor: '#eb8d28',
                  }
                }
              } else {
                // is array
                if (selectedDate.some((d) => isSameDate(d, date))) {
                  props.style = {
                    color: 'white',
                    backgroundColor: '#eb8d28',
                  }
                }
              }
              return props
            }}
          />
        </Grid>
      </>
    )
  }
  const renderStudents = () => {
    return (
      <Grid item container xs={12} justify='center' alignItems='flex-end'>
        <Button
          variant='outlined'
          style={{ textTransform: 'none', fontSize: 16 }}
          color='primary'
          fullWidth
          onClick={handleOwner}
        >
          Students
        </Button>
      </Grid>
    )
  }
  const handleOwner = () => {
    fetchStudents()
    setOpenDialog(!openDialog)
  }
  const fetchStudents = async () => {
    setIsLoadingStudents(true)
    const res = await fetch(`/api/tx/${listing.id}/students/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${state.token}`,
      },
    })
    const data = await res.json()
    if (!res.ok) {
      console.log(data)
      return
    }
    setTxs(data)
    setIsLoadingStudents(false)
  }

  const renderStudentList = (txs) => {
    return txs.map((tx, index) => {
      return <Tx key={tx.id} tx={tx} />
    })
  }
  return (
    <Grid item xs={4}>
      <Card className={classes.root}>
        <CardActionArea component='a' onClick={handleCardClick}>
          <CardContent>
            <Grid container item xs={12}>
              <Grid item container xs={12} sm={6}>
                <Typography
                  className={classes.mod}
                  color='textSecondary'
                  gutterBottom
                >
                  {listing.mod_code}
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={6}
                alignItems='center'
                justify='flex-end'
              >
                <Typography
                  className={classes.date}
                  color='textSecondary'
                  gutterBottom
                >
                  {diffDays === 0 ? 'recently' : diffDays + 'd ago'}
                </Typography>
              </Grid>
            </Grid>
            <Divider></Divider>
            <Box mt={1}>
              <Typography
                variant='body2'
                component='p'
                color='textSecondary'
                noWrap
              >
                {listing.description}
              </Typography>
            </Box>
            <Box mt={3}>
              <Typography
                variant='body2'
                align='left'
                color={listing.price ? 'primary' : 'secondary'}
                className={classes.price}
              >
                {listing.price ? '$' + listing.price + '/hr' : 'Free'}
              </Typography>
            </Box>
            <Box mt={2}>
              <Grid container item xs={12} direction='row'>
                <Grid item container xs={12} sm={2}>
                  <Box mt={0.3}>
                    <Typography variant='body2'>
                      {listing.avg_rating.toFixed(2)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <StarIcon style={{ color: 'FF5A60' }} />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Grid container item xs={12}>
            {listing.owner.user === state.user_id
              ? renderStudents()
              : renderSocials()}
          </Grid>
          <Dialog
            open={openDialog}
            onClose={handleOwner}
            scroll='paper'
            maxWidth='xs'
            fullWidth
          >
            <DialogTitle>Students</DialogTitle>
            <DialogContent dividers>
              <Grid container direction='column' spacing={4}>
                {isLoadingStudents ? 'loading...' : renderStudentList(txs)}
              </Grid>
            </DialogContent>
          </Dialog>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ListingCard
