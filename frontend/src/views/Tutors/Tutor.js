import React, { useState } from 'react'
import { Grid, Button, Divider, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
const Tutor = ({ tx }) => {
  const [isAccepted, setIsAccepted] = useState(tx.is_accepted)
  const renderReviewButton = () => {
    return (
      <Button
        variant='outlined'
        style={{ textTransform: 'none', fontSize: 16 }}
        color='greem'
        component={Link}
        to={`/listing/${tx.listing}/review`}
      >
        Leave a review
      </Button>
    )
  }
  const renderReviewedButton = () => {
    return (
      <Button
        variant='outlined'
        style={{ textTransform: 'none', fontSize: 16 }}
        disabled
      >
        Reviewed
      </Button>
    )
  }
  return (
    <>
      <Grid item container xs={12} spacing={6}>
        <Grid item xs={8}>
          <Typography
            component={Link}
            color='secondary'
            to={`/profile/${tx.tutor.user}`}
          >
            {tx.tutor.first_name}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          {isAccepted ? renderReviewButton() : renderReviewedButton()}
        </Grid>
      </Grid>
      <Divider style={{ width: '100%' }} />
    </>
  )
}

export default Tutor
