import React from 'react'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import Sidebar from './components/Sidebar'
import ProfilePanel from './ProfilePanel'




const Profile = () => {
  return (
    <div style ={{overflow:'scroll',height:'100%',display:'block'}}>
      <CustomGrid container justify='center' alignItems='flex-start' spacing={3}>
        <Sidebar />
        <ProfilePanel />
      </CustomGrid>
    </div>
  )
}

const CustomGrid = styled(Grid)`
  margin: 100px auto 0 auto;
`
export default Profile
