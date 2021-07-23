import React, { useState, useContext, useEffect } from 'react'
import { Grid, Paper, Typography, Box, IconButton } from '@material-ui/core'
import { useUserContext } from '../../../contexts/UserContext'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/base'
import { fill } from '@cloudinary/base/actions/resize'
import { max } from '@cloudinary/base/actions/roundCorners'
import { defaultImage } from '@cloudinary/base/actions/delivery'
import { getLevel } from '../../../utils'
import { useParams, Link } from 'react-router-dom'
import { Telegram, LinkedIn } from '@material-ui/icons'

const Sidebar = ({ owner }) => {
  const { state } = useUserContext()
  const { id } = useParams()
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'nusxchange',
    },
  })
  const profile_img =
    owner.avatar_id === '' ? cld.image('default') : cld.image(owner.avatar_id)
  profile_img.delivery(defaultImage('default'))
  profile_img.resize(fill().width(150).height(150)).roundCorners(max())
  const level = getLevel(owner.xp)
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
          Meet your tutor.
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant='h4'
          color='primary'
          component={Link}
          to={`/profile/${owner.user}`}
        >
          {owner.first_name + ' ' + owner.last_name}
        </Typography>
      </Grid>
      <Grid item>
        <Box ml={1}>
          <AdvancedImage cldImg={profile_img} />
        </Box>
      </Grid>
      <Grid item>
        <Typography variant='subtitle1'>Level {level}</Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant='body2' align='left'>
          {owner.bio}
        </Typography>
      </Grid>
      <Grid item container direction='row' spacing={1}>
        <IconButton
          onClick={() => window.open(`https://t.me/${owner.tg_url}`, '_blank')}
          disabled={owner.tg_url === ''}
        >
          <Telegram />
        </IconButton>
        <IconButton
          onClick={() => openWindow(owner.linkedin_url)}
          disabled={owner.linkedin_url === ''}
        >
          <LinkedIn />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Sidebar
