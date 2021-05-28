import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

export default () => {
  return (
    <Layout>
      <Typography variant='h1' color='secondary'>
        Coming soon.
      </Typography>
    </Layout>
  )
}

const Layout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
