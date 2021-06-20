import React, { useState, useEffect } from 'react'
import { Paper, Grid, Typography, Box } from '@material-ui/core'
import ListingCard from './ListingCard'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    '& > *': {
      width: theme.spacing(140),
    },
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}))
const Results = () => {
  const classes = useStyles()
  const { search } = useParams()
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(async () => {
    setIsLoading(true)
    const res = await fetch(`/api/listings/?mod_code=${search}`, {
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
  }, [search])
  const renderCards = (listings) => {
    return (
      <Paper elevation={2} className={classes.paper}>
        <Grid container spacing={2} alignItems='center'>
          {listings.map((listing, index) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </Grid>
      </Paper>
    )
  }

  const renderNoResults = () => {
    return (
      <Box mt={5}>
        <Typography variant='h2' align='center' color='secondary'>
          no results found :(
        </Typography>
      </Box>
    )
  }

  return (
    <>
      {isLoading || listings.length ? renderCards(listings) : renderNoResults()}
    </>
  )
}

const CustomGrid = styled(Grid)`
  margin: 100px auto 0 auto;
`

export default Results
