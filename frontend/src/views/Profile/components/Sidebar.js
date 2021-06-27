import React, { useState, useContext, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { Typography, LinearProgress, Box, IconButton } from '@material-ui/core'
import { useUserContext } from '../../../contexts/UserContext'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/base'
import { fill } from '@cloudinary/base/actions/resize'
import { max } from '@cloudinary/base/actions/roundCorners'
import { defaultImage } from '@cloudinary/base/actions/delivery'
import { useParams } from 'react-router-dom'
import { getLevel, getXpBarPercentage } from '../../../utils'
import { Telegram, LinkedIn } from '@material-ui/icons'
const Sidebar = () => {
  const { state } = useUserContext()
  const { id } = useParams()
  const initUserInfo = {
    first_name: '',
    bio: '',
    avatar_id: '',
    xp: '',
    tg_url: '',
    linkedin_url: '',
  }
  const [userInfo, setUserInfo] = useState(initUserInfo)
  useEffect(async () => {
    const res = await fetch(`/api/user/${id}`, {
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
          {(state.user_id == id ? 'Hello ' : '') + userInfo.first_name}
        </Typography>
      </Grid>
      <Grid item>
        <Box ml={1}>
          <AdvancedImage cldImg={profile_img} />
        </Box>
      </Grid>
      <Grid item>
        <Typography variant='body2'>Level {level}</Typography>
        <LinearProgress
          style={{ width: '200px' }}
          variant='determinate'
          value={percent * 100}
          color='secondary'
        />
        <Typography variant='body2'>
          {percent === 0 ? 200 : percent * 200} experience points to next level
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
            window.open(`https://t.me/${listing.owner.tg_url}`, '_blank')
          }
          disabled={listing.owner.tg_url === ''}
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
    </Grid>
  )
}

export default Sidebar
