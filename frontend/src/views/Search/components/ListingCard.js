import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Box,
  Typography,
  IconButton,
  Divider,
  Grid,
  CardHeader,
} from '@material-ui/core/'
import TelegramIcon from '@material-ui/icons/Telegram'
import DateRangeIcon from '@material-ui/icons/DateRange'
import StarIcon from '@material-ui/icons/Star'
import { AdvancedImage, placeholder } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/base'
import { fill } from '@cloudinary/base/actions/resize'
import { max } from '@cloudinary/base/actions/roundCorners'
import { defaultImage } from '@cloudinary/base/actions/delivery'
import { DateObject } from 'react-multi-date-picker'

const useStyles = makeStyles({
  root: {
    width: 240,
    height: 265,
    marginTop: 10,
    marginBottom: 10,
  },
  mod: {
    fontSize: 14,
  },
  date: {
    fontSize: 10,
  },
})

const ListingCard = ({ listing }) => {
  console.log(listing)
  const classes = useStyles()
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
  const date = new Date(listing.date_created.slice(0, -1))
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return (
    <Grid item xs={3} align='center'>
      <Card className={classes.root} variant='outlined'>
        <CardContent>
          <Grid container item xs={12}>
            <Grid item xs={3}>
              <AdvancedImage cldImg={profile_img} />
            </Grid>
            <Grid item container xs={7} direction='column'>
              <Grid item xs={6}>
                <Box ml={0.3}>
                  <Typography color='textSecondary' align='left'>
                    {listing.owner.first_name}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Typography
                  variant='caption'
                  color='textSecondary'
                  align='left'
                >
                  {diffDays} days ago
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={1}
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
              variant='body1'
              align='left'
              color={listing.price ? 'primary' : 'secondary'}
            >
              {listing.price ? listing.price + '/hr' : 'Free'}
            </Typography>
          </Box>
          <Box mt={2}>
            <Grid container item xs={12} direction='row'>
              <Grid item xs={1}>
                <Box mt={0.3}>
                  <Typography variant='body2'>
                    {listing.avg_rating.toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <StarIcon style={{ fill: 'red' }} />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <CardActions>
          <Grid container item xs={12}>
            <Grid item container xs={12} sm={6}>
              <Box mt={-0.1}>
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
              <IconButton color='primary' component='span'>
                <DateRangeIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ListingCard
