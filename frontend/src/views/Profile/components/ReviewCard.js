import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Grid,
} from '@material-ui/core/'
import Rating from '@material-ui/lab/Rating'
import ExpInfoModal from './ExpInfoModal'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/base'
import { fill } from '@cloudinary/base/actions/resize'
import { max } from '@cloudinary/base/actions/roundCorners'
import { defaultImage } from '@cloudinary/base/actions/delivery'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: 980,
    height: 250,
  },
  first_name: {
    fontSize: 16,
  },
  date: {
    fontSize: 14,
  },
  exp: {
    fontSize: 14,
  },
  descTextField: {
    '& .MuiInputBase-root.Mui-disabled': {
      color: 'rgba(0, 0, 0, 0.7)',
    },
  },
})

const ReviewCard = ({ review }) => {
  const classes = useStyles()

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'nusxchange',
    },
  })
  const profile_img =
    review.student.avatar_id === ''
      ? cld.image('default')
      : cld.image(review.student.avatar_id)
  profile_img.delivery(defaultImage('default'))
  profile_img.resize(fill().width(50).height(50)).roundCorners(max())

  // calculate relative days from current time
  const date = new Date(review.date_created.slice(0, -1))
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return (
    <Card className={classes.root} elevation={0}>
      <CardContent>
        <Grid container item lg={12} spacing={2}>
          <Grid item container lg={12} spacing={2}>
            <Grid item>
              <AdvancedImage cldImg={profile_img} />
            </Grid>
            <Grid item>
              <Box mt={2}>
                <Typography
                  className={classes.first_name}
                  component={Link}
                  to={`/profile/${review.student.user}`}
                  color='primary'
                >
                  {review.student.first_name}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box mt={2.2}>
                <Typography className={classes.date} color='textSecondary'>
                  {diffDays} days ago
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item container lg={12} spacing={2}>
            <Grid item>
              <Rating name='read-only' value={review.rating} readOnly />
            </Grid>
            <Grid item>
              <Box mt={0.4}>
                <Typography className={classes.exp} color='textSecondary'>
                  {review.exp_gained} experience gained
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box mt={-1.3}>
                <ExpInfoModal />
              </Box>
            </Grid>
          </Grid>
          <Grid item lg={12}>
            <TextField
              className={classes.descTextField}
              fullWidth
              multiline={true}
              rows={5}
              value={review.description}
              InputProps={{ disableUnderline: true }}
              disabled={true}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ReviewCard
