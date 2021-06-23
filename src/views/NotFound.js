import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const NotFound = () => {
  return (
    <Layout>
      <Typography variant='h2' color='secondary' align='center'>
        Error 404! Page not found.
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
export default NotFound
