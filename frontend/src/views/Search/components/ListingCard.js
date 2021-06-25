import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  Box,
  Typography,
  IconButton,
  Divider,
  Grid,
  CardHeader,
} from '@material-ui/core/'
import TelegramIcon from '@material-ui/icons/Telegram'
import StarIcon from '@material-ui/icons/Star'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/base'
import { fill } from '@cloudinary/base/actions/resize'
import { max } from '@cloudinary/base/actions/roundCorners'
import { defaultImage } from '@cloudinary/base/actions/delivery'
import { useHistory } from 'react-router-dom'
import Calendar, { DateObject } from 'react-multi-date-picker'
const useStyles = makeStyles({
  root: {
    width: 240,
    height: 265,
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
  const dates = listing.avail_dates
  const [DateObjects, setDateObjects] = useState([])

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

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'nusxchange',
    },
  })
  const profile_img =
    listing.owner.avatar_id === ''
      ? cld.image('default')
      : cld.image(listing.owner.avatar_id)

  profile_img.delivery(defaultImage('default'))
  profile_img.resize(fill().width(40).height(40)).roundCorners(max())

  // calculate relative days from current time
  const date = new Date(listing.date_created)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

  return (
    <Grid item xs={3}>
      <Card className={classes.root}>
        <CardActionArea component='a' onClick={handleCardClick}>
          <CardContent>
            <Grid
              container
              item
              xs={12}
              spacing={1}
              alignItems='flex-start'
              justify='flex-start'
            >
              <Grid item xs={3}>
                <AdvancedImage cldImg={profile_img} />
              </Grid>
              <Grid item container xs={7} direction='column'>
                <Grid item xs={6}>
                  <Typography color='textSecondary'>
                    {listing.owner.first_name}
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant='caption' color='textSecondary'>
                    {diffDays === 0 ? 'recently' : diffDays + 'd ago'}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={2}
                alignItems='flex-start'
                justify='flex-end'
              >
                <Typography variant='body2' color='textSecondary'>
                  {listing.mod_code}
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
                align='left'
              >
                {listing.description}
              </Typography>
            </Box>
            <Box mt={3}>
              <Typography
                align='left'
                variant='body2'
                color={listing.price ? 'primary' : 'secondary'}
                className={classes.price}
              >
                {listing.price ? '$' + listing.price + '/hr' : 'Free'}
              </Typography>
            </Box>
            <Box mt={2}>
              <Grid container item xs={12} direction='row'>
                <Grid item item container xs={12} sm={2}>
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
            <Grid item container xs={12} sm={6}>
              <Box mt={-0.5} ml={-0.5}>
                <IconButton color='primary' component='span'>
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
              <Calendar type='icon' value={DateObjects} />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ListingCard
