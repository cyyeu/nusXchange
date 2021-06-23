import React from "react";
import { Grid } from "@material-ui/core";
import styled from 'styled-components'
import Content from './Components/Content'


const Summarizer = () => {
  return (
    
    <CustomGrid container justify='center' alignItems='flex-start' spacing={3}>
      <Content />
    </CustomGrid>
  )
}

const CustomGrid = styled(Grid)`
  margin: 100px auto 0 auto;
  marginBottom: 50px;
`
export default Summarizer
