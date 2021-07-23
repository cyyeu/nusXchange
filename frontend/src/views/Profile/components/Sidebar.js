import React, { useState } from 'react'
import {
  Typography,
  LinearProgress,
  Box,
  IconButton,
  Grid,
} from '@material-ui/core'
import { useUserContext } from '../../../contexts/UserContext'
import { AdvancedImage } from '@cloudinary/react'
import { getLevel, getXpBarPercentage } from '../../../utils'
import { Telegram, LinkedIn } from '@material-ui/icons'
import { useParams } from 'react-router-dom'
import useUser from '/src/hooks/useUser'
import Verify from '/src/components/Verify'

const Sidebar = () => {
  const { state } = useUserContext()
  const [open, setOpen] = useState(false)
  const { id } = useParams()
  const [loading, user] = useUser(id)

  const level = getLevel(user.xp)
  const percent = getXpBarPercentage(user.xp)

  // add http to linkedin url if missing
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
          {(state.user_id == id ? 'Hello ' : '') + user.first_name}
        </Typography>
      </Grid>
      <Grid item>
        <Box ml={1}>
          <AdvancedImage cldImg={user.profile_img} />
        </Box>
      </Grid>
      <Verify user={user} />
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
          {user.bio}
        </Typography>
      </Grid>
      <Grid item container direction='row' spacing={1}>
        <IconButton
          onClick={() => window.open(`https://t.me/${user.tg_url}`, '_blank')}
          disabled={user.tg_url === ''}
        >
          <Telegram />
        </IconButton>
        <IconButton
          onClick={() => openWindow(user.linkedin_url)}
          disabled={user.linkedin_url === ''}
        >
          <LinkedIn />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Sidebar
