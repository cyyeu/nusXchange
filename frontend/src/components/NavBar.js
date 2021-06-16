import React, { useState, useContext, useEffect } from 'react'
import { Link, StaticRouter } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  ButtonGroup,
  Icon,
  MenuItem,
} from '@material-ui/core'
import { AccountCircle, Chat } from '@material-ui/icons'
import styled from 'styled-components'
import { useUserContext } from '../contexts/UserContext'
import { Menu } from '@material-ui/core'

const NavBar = () => {
  const { state, dispatch } = useUserContext()
  const [anchorEl, setAnchorEl] = useState(null)
  const [auth, setAuth] = useState(state.isAuthenticated)
  useEffect(() => {
    setAuth(state.isAuthenticated)
  }, [state])
  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleMenuClose()
    dispatch({
      type: 'LOGOUT',
    })
  }

  const renderIcons = () => {
    return (
      <>
        <IconButton color='inherit'>
          <Chat />
        </IconButton>
        <IconButton color='inherit' onClick={handleMenuOpen}>
          <AccountCircle />
        </IconButton>
        <Menu
          id='profile-menu'
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to='/profile'>
            {' '}
            Profile{' '}
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to='/settings'>
            {' '}
            Settings{' '}
          </MenuItem>
          <MenuItem onClick={handleLogout} component={Link} to='/'>
            {' '}
            Logout{' '}
          </MenuItem>
        </Menu>
      </>
    )
  }

  const renderAuthButtons = () => {
    return (
      <ButtonGroup color='secondary' size='small'>
        <Button variant='outlined' component={Link} to='/signup'>
          {' '}
          Sign up{' '}
        </Button>
        <Button variant='outlined' component={Link} to='/login'>
          {' '}
          Log in
        </Button>
      </ButtonGroup>
    )
  }
  return (
    <AppBar position='sticky'>
      <CustomToolbar>
        <LogoWrapper>
          <Link to='/'>
            <Logo src='../static/logo.png' alt='logo' />
          </Link>
        </LogoWrapper>

        <CustomButton
          style={{ textTransform: 'none', fontSize: 16 }}
          component={Link}
          to='/'
        >
          tutorXchange
        </CustomButton>
        <CustomButton
          style={{ textTransform: 'none', fontSize: 16 }}
          component={Link}
          to='/summarizer'
        >
          Summarizer
        </CustomButton>
        {auth ? renderIcons() : renderAuthButtons()}
      </CustomToolbar>
    </AppBar>
  )
}

const CustomToolbar = styled(Toolbar)`
  min-height: 60px;
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
