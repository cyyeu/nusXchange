import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box, Typography, Paper, Divider } from '@material-ui/core/'
import ReviewCard from './ReviewCard'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: theme.spacing(130),
    },
    marginTop: theme.spacing(-2),
    marginLeft: theme.spacing(-2),
  },
}))

const Review = () => {
  const classes = useStyles()
  const { id } = useParams()
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function loadReviews() {
      setIsLoading(true)
      const res = await fetch(`/api/reviews/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data)
        return
      }
      setReviews(data)
      setIsLoading(false)
    }
    loadReviews()
  }, [id])

  const renderCards = (reviews) => {
    return (
      <Paper elevation={2} className={classes.paper}>
        <Box m={4}>
          <Grid container spacing={2} alignItems='center'>
            {reviews.map((review, index) => (
              <>
                <ReviewCard key={review.id} review={review} />
                <Divider style={{ width: '100%' }} />
              </>
            ))}
          </Grid>
        </Box>
      </Paper>
    )
  }

  const renderNoResults = () => {
    return (
      <Typography variant='h2' align='center' color='secondary'>
        no reviews found.
      </Typography>
    )
  }

  return (
    <>
      {isLoading || reviews.length ? renderCards(reviews) : renderNoResults()}
    </>
  )
}

export default Review
