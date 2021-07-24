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
  IconButton,
  CircularProgress,
} from '@material-ui/core/'
import ListingCard from './ListingCard'
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

const Listing = () => {
  const classes = useStyles()
  const { id } = useParams()
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async () => {
    setIsLoading(true)
    const res = await fetch(`/api/listings/?user=${id}`, {
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
    setListings(data)
    setIsLoading(false)
  }, [id])

  const renderCards = (listings) => {
    return (
      <Paper elevation={2} className={classes.paper}>
        <Box m={4}>
          <Grid container spacing={2} alignItems='center'>
            {isLoading ? (
              <CircularProgress color='secondary' />
            ) : (
              listings.map((listing, index) => (
                <ListingCard key={listing.id} listing={listing} />
              ))
            )}
          </Grid>
        </Box>
      </Paper>
    )
  }

  const renderNoResults = () => {
    return (
      <Typography variant='h2' align='center' color='secondary'>
        no listings found.
      </Typography>
    )
  }

  return (
    <>
      {isLoading || listings.length ? renderCards(listings) : renderNoResults()}
    </>
  )
}

export default Listing
