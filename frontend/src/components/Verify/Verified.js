import React from 'react'
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined'
import { Grid, Box, Typography } from '@material-ui/core'

const verified = () => {
  return (
    <Grid item container spacing={1}>
      <Grid item xs={1}>
        <Box ml={-0.2}>
          <VerifiedUserOutlinedIcon style={{ color: 'green' }} />
        </Box>
      </Grid>
      <Grid item container direction='row' alignItems='center' xs={6}>
        <Typography variant='body2'>Email Verified</Typography>
      </Grid>
    </Grid>
  )
}

export default verified
