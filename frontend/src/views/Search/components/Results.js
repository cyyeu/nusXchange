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
function doDatesInterSect(dateStringArr, dateObjArr) {

  return dateStringArr.some((dateString) =>
    dateObjArr.some((dateObj) => {
      const diffTime = Math.abs(dateObj.toDate() - new Date(dateString))
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))
      return diffDays < 1
    })
  )
}
const Results = ({ sortMethodHook, filterDatesHook }) => {
  const classes = useStyles()
  const { search } = useParams()
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortMethod, setSortMethod] = sortMethodHook
  const [filterDates, setFilterDates] = filterDatesHook
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

    // filter
    if (filterDates.length !== 0) {
      setListings((listings) =>
        listings.filter(
          (listing) =>
            listing.avail_dates.length &&
            doDatesInterSect(listing.avail_dates, filterDates)
        )
      )
    }

    // then sort
    if (sortMethod === 'Price') {
      console.log('sorting by price...')
      setListings((listings) => [...listings].sort((x, y) => x.price - y.price))
      console.log(listings)
    } else if (sortMethod === 'Rating') {
      console.log('sorting by rating...')
      setListings((listings) =>
        [...listings].sort((x, y) => y.avg_rating - x.avg_rating)
      )
      console.log(listings)
    } else if (sortMethod === 'Newest') {
      console.log('sorting by date...')
      setListings((listings) =>
        [...listings].sort(
          (x, y) => new Date(y.date_created) - new Date(x.date_created)
        )
      )
      console.log(listings)
    }
  }, [search, sortMethod, filterDates])
  const renderCards = (listings) => {
    return (
      <Paper elevation={2} className={classes.paper}>
        <Box m={4}>
          <Grid container spacing={2} alignItems='center'>
            {listings.map((listing, index) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </Grid>
        </Box>
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
