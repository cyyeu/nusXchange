import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Box,
  Typography,
  Paper,
  Divider,
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@material-ui/core'
import styled from 'styled-components'
import Tutor from './Tutor'
import { useUserContext } from '../../contexts/UserContext'
import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: theme.spacing(120),
      height: theme.spacing(60),
    },
    marginTop: theme.spacing(-3),
    marginLeft: theme.spacing(2),
  },
  div: {
    width: '90%',
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}))
const Tutors = () => {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(true)
  const [txs, setTxs] = useState([])
  const { state } = useUserContext()
  useEffect(() => {
    async function getTxs() {
      setIsLoading(true)
      const res = await fetch(`/api/tx/tutors/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${state.token}`,
        },
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data)
        setIsLoading(false)
        return
      }
      setTxs(data)
      setIsLoading(false)
    }
    getTxs()
  }, [])

  const renderTxs = (txs) => {
    console.log(txs)
    return txs.length ? (
      <TableContainer component={Paper}>
        {' '}
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Module Code</TableCell>
              <TableCell align='left'>Tutor </TableCell>
              <TableCell align='left'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {txs.map((tx) => {
              return (
                <TableRow key={tx.id}>
                  <TableCell component='th' scope='row'>
                    {tx.listing.mod_code}
                  </TableCell>
                  <TableCell align='left'>
                    <Typography
                      component={Link}
                      to={`/profile/${tx.listing.owner.user}`}
                    >
                      {tx.listing.owner.first_name}
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>{renderButton(tx)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <Box mt={5}>
        <Typography variant='h2' align='center' color='secondary'>
          no tutors found :(
        </Typography>
      </Box>
    )
  }
  const renderReviewButton = (tx) => {
    return (
      <Button
        variant='outlined'
        style={{ textTransform: 'none', fontSize: 16 }}
        component={Link}
        to={`/listing/${tx.listing.id}/review`}
      >
        Leave a review
      </Button>
    )
  }
  const renderDisabledButton = (tx) => {
    // disabled button only for review given and pending accept.
    return (
      <Button
        variant='outlined'
        style={{ textTransform: 'none', fontSize: 16 }}
        disabled
      >
        {tx.gave_review ? 'Review given' : 'Pending accept...'}
      </Button>
    )
  }

  const renderButton = (tx) => {
    return tx.is_accepted
      ? tx.gave_review
        ? renderDisabledButton(tx)
        : renderReviewButton(tx)
      : renderDisabledButton(tx)
  }
  return (
    <CustomGrid container justify='center' alignItems='flex-start' spacing={1}>
      <Paper elevation={3} className={classes.paper}>
        <Grid container direction='column' spacing={2}>
          <Grid item container>
            <Box ml={4} pt={4}>
              <Typography variant='h4' color='secondary'>
                Tutors
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Divider variant='middle' />
          </Grid>
          <div className={classes.div}>
            <Grid container item spacing={4} direction='column'>
              {isLoading ? 'loading' : renderTxs(txs)}
            </Grid>
          </div>
        </Grid>
      </Paper>
    </CustomGrid>
  )
}
const CustomGrid = styled(Grid)`
  margin: 100px auto 0 auto;
`
export default Tutors
