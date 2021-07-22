import React, { useState } from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
export default () => {
  const [isTimedOut, setIsTimedOut] = useState(true)
  setTimeout(() => {
    setIsTimedOut(false)
  }, 2500)
  return (
    <>
      {isTimedOut ? (
        <Layout>
          <Typography variant='h4' color='secondary' align='center'>
            Successfully verified!
            <br /> Redirecting you in a second...
          </Typography>
        </Layout>
      ) : (
        <Redirect to='/' />
      )}
    </>
  )
}

const Layout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
