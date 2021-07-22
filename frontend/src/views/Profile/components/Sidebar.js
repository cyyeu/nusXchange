import React, { useState, useEffect } from 'react'
import {
  Typography,
  LinearProgress,
  Box,
  IconButton,
  Snackbar,
  Grid,
  Link,
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useUserContext } from '../../../contexts/UserContext'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/base'
import { fill } from '@cloudinary/base/actions/resize'
import { max } from '@cloudinary/base/actions/roundCorners'
import { defaultImage } from '@cloudinary/base/actions/delivery'
import { useParams } from 'react-router-dom'
import { getLevel, getXpBarPercentage } from '../../../utils'
import { Telegram, LinkedIn } from '@material-ui/icons'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined'

const Sidebar = () => {
  const { state } = useUserContext()
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const initUserInfo = {
    user: {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
    },
    verified: false,
    bio: '',
    xp: 0,
    avatar_id: '',
    linkedin_url: '',
    tg_url: '',
  }
  const [userInfo, setUserInfo] = useState(initUserInfo)

  // for snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  useEffect(async () => {
    const res = await fetch(`/api/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    if (!res.ok) {
      return
    }
    console.log(data)
    setUserInfo(data)
  }, [id])

  //cloudinary instance and code
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'nusxchange',
    },
  })

  const profile_img =
    userInfo.avatar_id === ''
      ? cld.image('default')
      : cld.image(userInfo.avatar_id)
  profile_img.delivery(defaultImage('default'))
  profile_img.resize(fill().width(150).height(150)).roundCorners(max())
  const level = getLevel(userInfo.xp)
  const percent = getXpBarPercentage(userInfo.xp)

  const openWindow = (url) => {
    url = url.match(/^http[s]?:\/\//) ? url : 'http://' + url
    window.open(url, '_blank')
  }

  const renderVerified = () => {
    return (
      <Grid item container spacing={1}>
        <Grid item xs={1}>
          <Box ml={-0.2}>
            <VerifiedUserOutlinedIcon style={{ color: 'green' }} />
          </Box>
        </Grid>
        <Grid
          item
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          xs={6}
        >
          <Typography variant='body2'>Email Verified</Typography>
        </Grid>
      </Grid>
    )
  }

  const renderNotVerified = () => {
    return (
      <Grid item container spacing={1}>
        <Grid item xs={1}>
          <Box ml={-0.2}>
            <CancelOutlinedIcon style={{ color: 'red' }} />
          </Box>
        </Grid>
        <Grid
          item
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          xs={10}
        >
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

  const handleVerify = async (e) => {
    e.preventDefault()
    const payload = {
      email: userInfo.user.email,
    }
    const res = await fetch(`/api/resend-verification-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    setOpen(true)
    console.log(data)
  }

  return (
    <Grid
      item
      container
      alignItems='flex-start'
      xs={2}
      direction='column'
      spacing={2}
    >
      <Grid item>
        <Typography variant='h4' color='secondary'>
          {(state.user_id == id ? 'Hello ' : '') + userInfo.user.first_name}
        </Typography>
      </Grid>
      <Grid item>
        <Box ml={1}>
          <AdvancedImage cldImg={profile_img} />
        </Box>
      </Grid>
      {userInfo.verified ? renderVerified() : renderNotVerified()}
      <Grid item>
        <Typography variant='body2'>Level {level}</Typography>
        <LinearProgress
          style={{ width: '200px' }}
          variant='determinate'
          value={percent * 100}
          color='secondary'
        />
        <Typography variant='body2'>
          {200 - percent * 200} experience points to next level
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant='body2' align='left'>
          {userInfo.bio}
        </Typography>
      </Grid>
      <Grid item container direction='row' spacing={1}>
        <IconButton
          onClick={() =>
            window.open(`https://t.me/${userInfo.tg_url}`, '_blank')
          }
          disabled={userInfo.tg_url === ''}
        >
          <Telegram />
        </IconButton>
        <IconButton
          onClick={() => openWindow(userInfo.linkedin_url)}
          disabled={userInfo.linkedin_url === ''}
        >
          <LinkedIn />
        </IconButton>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert onClose={handleClose} severity='success'>
          <AlertTitle>Success</AlertTitle>
          Email sent! Please check your inbox or junk folder.
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default Sidebar
