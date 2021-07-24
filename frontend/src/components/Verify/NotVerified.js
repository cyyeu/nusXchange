import React, { useState } from 'react'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'

import {
  Grid,
  Box,
  Typography,
  Link,
  Button,
  CircularProgress,
} from '@material-ui/core'
import { useSnackbarContext, useUserContext } from '../../contexts/'

const NotVerified = ({ user }) => {
  const { dispatch } = useSnackbarContext()
  const { state } = useUserContext()
  const [loading, setLoading] = useState(false)
  const handleVerify = async (e) => {
    e.preventDefault()
    setLoading(true)
    const payload = {
      email: user.email,
    }
    const res = await fetch(`/api/resend-verification-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    if (res.ok) {
      dispatch({
        type: 'SUCCESS',
        payload: {
          msg: 'Verification email sent!',
        },
      })
    } else {
      dispatch({
        type: 'ERROR',
        payload: {
          msg: data,
        },
      })
    }
    setLoading(false)
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
          {state.user_id === user.pk &&
            (loading ? (
              <CircularProgress size='0.7rem' color='secondary' />
            ) : (
              <Link onClick={handleVerify} href=''>
                Verify Now
              </Link>
            ))}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default NotVerified
