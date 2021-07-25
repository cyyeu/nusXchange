import React from 'react'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import Content from './Components/Content'

const Summarizer = () => {
  return (
    <div style={{ height: '100%', display: 'block' }}>
      <CustomGrid
        container
        justify='center'
        alignItems='flex-start'
        spacing={3}
      >
        <Content />
      </CustomGrid>
    </div>
  )
}

const CustomGrid = styled(Grid)`
  margin: 75px auto 0 auto;
  margin-bottom: 50px;
`
export default Summarizer
