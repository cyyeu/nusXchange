import React, {useState, useEffect} from 'react'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import Sidebar from './components/Sidebar'
import Content from  "./components/Content"
import { useParams } from 'react-router-dom'

const ListingPage = () => {
  const { id } = useParams()
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(async () => {
    setIsLoading(true)
    const res = await fetch(`/api/listings/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    if (!res.ok) {
      console.log(data)
      return
    }
    setListings(data)
    console.log(data)
    setIsLoading(false)
  }, [id])

  const renderContent = (listings) => {
    return (
      <Content listing = {listings}/>
    )
  }
  const renderSidebar = (listings) => {
    return (
      <Sidebar owner = {listings.owner}/>
    )
  }

  return (
    <div style ={{overflow:'scroll',height:'100%',display:'block'}}>
      <CustomGrid container justify='center' alignItems='flex-start' spacing={4}>
          {isLoading || renderSidebar(listings)}
          {isLoading || renderContent(listings)}
      </CustomGrid>
    </div>
  )
}

const CustomGrid = styled(Grid)`
  margin: 75px auto 0 auto;
  margin-bottom: 50px;
`
export default ListingPage