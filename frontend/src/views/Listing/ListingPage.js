import React from 'react'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import Sidebar from './components/Sidebar'
import Content from  "./components/Content"

const ListingPage = () => {
  return (
    <div style ={{overflow:'scroll',height:'100%',display:'block'}}>
      <CustomGrid container justify='center' alignItems='flex-start' spacing={4}>
        <Sidebar />
        <Content />
      </CustomGrid>
    </div>
  )
}

const CustomGrid = styled(Grid)`
  margin: 75px auto 0 auto;
  margin-bottom: 50px;
`
export default ListingPage