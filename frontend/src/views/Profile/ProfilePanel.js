import React from 'react'
import { Grid, Tab, Tabs, Button, Box, Paper } from '@material-ui/core'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import Listing from './components/Listing'
import Review from './components/Review'
import { useUserContext } from '../../contexts/UserContext'

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
  const { id } = useParams()
  const { state } = useUserContext()
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid item container xs={8} direction='column'>
      <Grid item container xs={12} spacing={1}>
        <Grid item xs={7}>
          <Tabs value={value} onChange={handleChange} selectionFollowsFocus>
            <Tab label='Listings' />
            <Tab label='Reviews' />
          </Tabs>
        </Grid>
        {state.user_id == id && (
          <Grid item xs={3}>
            <Button variant='outlined' component={Link} to='/settings'>
              {' '}
              Edit Profile{' '}
            </Button>
          </Grid>
        )}
        <Grid item container>
          <TabPanel value={value} index={0}>
            <Listing />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Review />
          </TabPanel>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProfilePanel
