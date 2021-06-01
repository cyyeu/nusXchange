import { Typography, TextField, Grid, Button, Link } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import Searchbar from './components/Searchbar'
import Divider from './components/Divider'
import { useHistory } from 'react-router-dom'

const Home = () => {
  const history = useHistory()
  const [search, setSearch] = useState('')
  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }
  const handleSubmit = () => {
    history.push('/search')
  }

  return (
    <Layout>
      <Grid container wrap='wrap' direction='column' spacing={8}>
        <Grid item xs={12}>
          <Typography variant='h2' color='secondary' noWrap>
            How can we help you today?
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <form>
            <Searchbar onChange={handleSearch} onSubmit={handleSubmit} />
          </form>
        </Grid>
        <Grid item container spacing={1} justify='center' alignItems='center'>
          <Grid item xs={4}>
            <Divider />
          </Grid>
          <Grid item xs={2} align='center'>
            <Typography>or</Typography>
          </Grid>
          <Grid item xs={4}>
            <Divider />
          </Grid>
        </Grid>
        <Grid item xs={12} align='center'>
          <CustomButton
            variant='outlined'
            color='primary'
            align='center'
            size='large'
            href='/create'
          >
            Create a listing
          </CustomButton>
        </Grid>
      </Grid>
    </Layout>
  )
}

const CustomButton = styled(Button)`
  padding: 10px 30px;
  border-radius: 30px;
`
const Layout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default Home
