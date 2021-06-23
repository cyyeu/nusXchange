import styled from 'styled-components'
import { Search } from '@material-ui/icons'
import { TextField, InputAdornment } from '@material-ui/core'
import React from 'react'
import { IconButton } from '@material-ui/core'

const Searchbar = ({ onChange, onSubmit }) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      return onSubmit()
    }
  }
  return (
    <CustomTextField
      label='Search by module code'
      size='medium'
      color='primary'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={onSubmit}>
              <Search />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={onChange}
      onKeyDown={handleKeyDown}
    />
  )
}

const CustomTextField = styled(TextField)`
  width: 40%;
  height: 75%;
`
export default Searchbar
