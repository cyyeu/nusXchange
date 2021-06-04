import React from 'react'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import { Typography, Avatar, LinearProgress } from '@material-ui/core'

const Sidebar = () => {
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
          Hello Jethro.
        </Typography>
      </Grid>
      <Grid item>
        <AvatarPlaceholder />
      </Grid>
      <Grid item>
        <Typography variant='body2'>Level 5</Typography>
        <LinearProgress
          style={{ width: '200px' }}
          variant='determinate'
          value={40}
          color='secondary'
        />
        <Typography variant='body2'>
          100 experience points to next level
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant='body2' align='left'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae
          vulputate tortor. Nam nec justo in neque blandit hendrerit sit amet ut
          ante. Duis elit mauris, elementum sed lacus nec.
        </Typography>
      </Grid>
    </Grid>
  )
}

const AvatarPlaceholder = styled(Avatar)`
  height: 150px;
  width: 150px;
`

export default Sidebar
