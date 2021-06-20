import React, { useState } from 'react'
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  makeStyles,
  FormControl,
  InputLabel,
  Box,
} from '@material-ui/core'
import { Search } from '@material-ui/icons'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))
const SearchBar = ({ search }) => {
  const classes = useStyles()
  const history = useHistory()
  const [searchField, setSearchField] = useState('')
  const [sortMethod, setSortMethod] = useState('')
  const [filterMethod, setFilterMethod] = useState('')
  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      return onSubmit()
    }
  }
  const onSearchChange = (e) => {
    setSearchField(e.target.value)
  }
  const handleSortMethodChange = (e) => {
    setSortMethod(e.target.value)
  }
  const handleFilterMethodChange = (e) => {
    setFilterMethod(e.target.value)
  }
  const onSubmit = () => {
    history.push(`${searchField}`)
  }
  return (
    <Grid
      container
      item
      justify='center'
      spacing={3}
      alignItems='center'
      xs={12}
    >
      <Grid item xs={2}>
        <Box pt={2}>
          <Typography align='center'>Search results for '{search}'</Typography>
        </Box>
      </Grid>

      <Grid item xs={4}>
        <CustomTextField
          label='Search by module code'
          size='medium'
          color='primary'
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={onSubmit}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={onSearchChange}
          onKeyDown={handleKeyDown}
        />
      </Grid>
      <Grid item xs={1}>
        <FormControl className={classes.formControl}>
          <InputLabel id='sort-method'>Sort by</InputLabel>
          <Select value={sortMethod} onChange={handleSortMethodChange}>
            <MenuItem value='Price'>Price</MenuItem>
            <MenuItem value='Ranking'>Ranking</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={1}>
        <FormControl className={classes.formControl}>
          <InputLabel id='sort-method'>Filter by</InputLabel>
          <Select value={filterMethod} onChange={handleFilterMethodChange}>
            <MenuItem value='Availability'>Availability</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

const CustomTextField = styled(TextField)``

export default SearchBar
