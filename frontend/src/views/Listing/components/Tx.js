import React, { useState } from 'react'
import { Grid, Button, Divider, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../../contexts/UserContext'
import { makeStyles } from '@material-ui/styles'

const Tx = ({ tx }) => {
  const { state } = useUserContext()
  const [isAccepted, setIsAccepted] = useState(tx.is_accepted)
  const handleAccept = async () => {
    const res = await fetch(
      `/api/tx/accept/?listing=${tx.listing}&student=${tx.student.user}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${state.token}`,
        },
      }
    )
    const data = await res.json()
    if (!res.ok) {
      console.log(data)
      return
    }
    setIsAccepted(true)
    console.log(`accepted ${tx.student.user}`)
  }
  const renderAcceptButton = () => {
    return (
      <Button
        variant='outlined'
        style={{ textTransform: 'none', fontSize: 16 }}
        color='greem'
        onClick={handleAccept}
      >
        Accept
      </Button>
    )
  }
  const renderAcceptedButton = () => {
    return (
      <Button
        variant='outlined'
        style={{ textTransform: 'none', fontSize: 16 }}
        disabled
      >
        Accepted
      </Button>
    )
  }
  return (
    <>
      <Grid item container xs={12} spacing={6}>
        <Grid item xs={8}>
          <Typography
            component={Link}
            color='secondary'
            to={`/profile/${tx.student.user}`}
          >
            {tx.student.first_name}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          {isAccepted ? renderAcceptedButton() : renderAcceptButton()}
        </Grid>
      </Grid>
      <Divider style={{ width: '100%' }} />
    </>
  )
}

export default Tx
