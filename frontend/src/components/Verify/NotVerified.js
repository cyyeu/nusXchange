import React from 'react'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'

import { Grid, Box, Typography, Link } from '@material-ui/core'

const NotVerified = ({ email }) => {
  const handleVerify = async (e) => {
    e.preventDefault()
    const payload = {
      email,
    }
    const res = await fetch(`/api/resend-verification-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    console.log(data)

    //TODO: OPEN SNACKBAR
  }

  return (
    <Grid item container spacing={1}>
      <Grid item xs={1}>
        <Box ml={-0.2}>
          <CancelOutlinedIcon style={{ color: 'red' }} />
        </Box>
      </Grid>
      <Grid item container direction='row' alignItems='center' xs={10}>
        <Typography variant='body2'>
          Email Not Verified.{' '}
          <Link onClick={handleVerify} href=''>
            Verify Now
          </Link>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default NotVerified
