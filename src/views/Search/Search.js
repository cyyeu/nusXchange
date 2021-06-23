import React from 'react'
import { Grid } from '@material-ui/core'
import SearchBar from './components/SearchBar'
import Results from './components/Results'
import styled from 'styled-components'

const Search = () => {
  return (
    <div
      style={{
        overflow: 'scroll',
        height: '100%',
        display: 'block',
        paddingBottom: '10rem',
      }}
    >
      <CustomGrid
        container
        alignItems='center'
        justify='center'
        direction='column'
        spacing={3}
      >
        <SearchBar />
        <Results />
      </CustomGrid>
    </div>
  )
}

const CustomGrid = styled(Grid)`
  margin: 100px auto 0 auto;
`
export default Search
