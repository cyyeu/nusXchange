import React from 'react'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'

const Profile = () => {
  return (
    <CustomGrid container justify='center' spacing={2}>
      <Grid item container justify='center' xs={3}>
        test
      </Grid>
      <Grid item container justify='center' xs={7}>
        test
      </Grid>
    </CustomGrid>
  )
}

const CustomGrid = styled(Grid)`
  margin: 100px auto 0 auto;
`
export default Profile
