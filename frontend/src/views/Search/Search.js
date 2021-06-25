import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import SearchBar from './components/SearchBar'
import Results from './components/Results'
import styled from 'styled-components'

const Search = () => {
  const sortMethodHook = useState('')
  const filterDatesHook = useState([])
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
        <SearchBar
          sortMethodHook={sortMethodHook}
          filterDatesHook={filterDatesHook}
        />
        <Results
          sortMethodHook={sortMethodHook}
          filterDatesHook={filterDatesHook}
        />
      </CustomGrid>
    </div>
  )
}

const CustomGrid = styled(Grid)`
  margin: 100px auto 0 auto;
`
export default Search
