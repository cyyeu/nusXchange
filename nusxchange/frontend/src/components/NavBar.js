import React, { useState } from 'react'
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  ButtonGroup,
  Icon,
} from '@material-ui/core'
import { AccountCircle, Chat } from '@material-ui/icons'
import styled from 'styled-components'

const renderIcons = () => {
  return (
    <>
      <IconButton color='inherit'>
        <Chat />
      </IconButton>
      <IconButton color='inherit'>
        <AccountCircle />
      </IconButton>
    </>
  )
}



const renderAuthButtons = () => {
  return (
    <ButtonGroup color='secondary' size='small'>
      <Button variant = "outlined" component={Link} to = '/signup'> Sign up </Button>
      <Button variant = "outlined" component={Link} to = '/login'> Log in</Button>
    </ButtonGroup>
  )
}
const NavBar = () => {
  const [auth, setAuth] = useState(false)

  return (
    <AppBar position='sticky'>
      <CustomToolbar>
        <LogoWrapper>
          <Logo src='../static/logo.png' alt='logo' />
        </LogoWrapper>
        <CustomButton component={Link} to='/'>tutorXchange</CustomButton>
        <CustomButton component={Link} to='/summarizer'>Summarizer</CustomButton>
        {auth ? renderIcons() : renderAuthButtons()}
      </CustomToolbar>
    </AppBar>
  )
}

const CustomToolbar = styled(Toolbar)`
  min-height: 36px;
`
const Logo = styled.img`
  height: 20px;
  width: 140px;
  margin: 2px 0 0 0;
  padding: 0;
`
const LogoWrapper = styled.div`
  flex-grow: 1;
`

const CustomButton = styled(Button)`
  color: #f5ecda;
`

export default NavBar
