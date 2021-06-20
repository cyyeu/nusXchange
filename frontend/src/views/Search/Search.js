import React from 'react'
import { Grid } from '@material-ui/core'
import SearchBar from './components/SearchBar'
import Results from './components/Results'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
const Search = () => {
  const { search } = useParams()
  return (
    <CustomGrid container justify='center'>
      <SearchBar search={search} />
      <Results />
    </CustomGrid>
  )
}

const CustomGrid = styled(Grid)`
  margin: 100px auto 0 auto;
`
export default Search
