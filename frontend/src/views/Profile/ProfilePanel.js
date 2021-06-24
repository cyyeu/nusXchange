import React from 'react'
import { Grid, Tab, Tabs, Button, Box, Paper } from '@material-ui/core'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Listing from './components/Listing'
import Review from './components/Review'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

const ProfilePanel = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid item container xs = {8}>
      <Grid item container xs={12} spacing={1} alignItems='center'>
        <Grid item xs={9}>
            <Tabs value={value} onChange={handleChange} selectionFollowsFocus>
              <Tab label='Listings' />
              <Tab label='Reviews' />
            </Tabs>
        </Grid>
        <Grid item >
          <Button variant='outlined' component={Link} to='/settings'>
            {' '}
            Edit Profile{' '}
          </Button>
        </Grid>
        <TabPanel value={value} index={0}>
          <Listing />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Review />
        </TabPanel>
      </Grid>
    </Grid>
  )
}

export default ProfilePanel
