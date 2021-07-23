import React from 'react'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import { useParams } from 'react-router-dom'
import useListing from '../../hooks/useListing'

const ListingPage = () => {
  const { id } = useParams()
  const [loading, listing] = useListing(id)
  return (
    <div style={{ overflow: 'scroll', height: '100%', display: 'block' }}>
      <CustomGrid
        container
        justify='center'
        alignItems='flex-start'
        spacing={4}
      >
        <Sidebar owner={listing.owner} />
        <Content listing={listing} />
      </CustomGrid>
    </div>
  )
}

const CustomGrid = styled(Grid)`
  margin: 50px auto 0 auto;
  margin-bottom: 100px;
`
export default ListingPage
