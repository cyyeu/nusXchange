import React, { useState, useEffect } from 'react'
import { useUserContext } from '../../../contexts/UserContext'
import { useParams, Link, useLocation } from 'react-router-dom'
import {
  Button,
  Dialog,
  Grid,
  DialogTitle,
  DialogContent,
} from '@material-ui/core'
import Tx from './Tx'
const TxButton = () => {
  const { state } = useUserContext()
  const [status, setStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingStudents, setIsLoadingStudents] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [txs, setTxs] = useState([])
  const { id } = useParams()
  const location = useLocation()

  useEffect(() => {
    async function getStatus() {
      setIsLoading(true)
      const res = await fetch(`/api/tx/${id}/status/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${state.token}`,
        },
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data)
        return
      }
      console.log('status', data)
      setStatus(data)
      setIsLoading(false)
    }
    if (state.isAuthenticated) {
      getStatus()
    }
  }, [state])
  const renderLoginButton = () => {
    return (
      <Button
        variant='outlined'
        style={{ textTransform: 'none', fontSize: 16 }}
        color='primary'
        fullWidth
        component={Link}
        to='/login'
      >
        Login to request to be a student!
      </Button>
    )
  }
  const renderButton = () => {
    return status.user_type === 'owner'
      ? renderOwner()
      : status.user_type === 'student'
      ? renderStudent()
      : renderRequest()
  }

  const renderOwner = () => {
    return (
      <Button
        variant='outlined'
        style={{ textTransform: 'none', fontSize: 16 }}
        color='primary'
        fullWidth
        onClick={handleOwner}
      >
        View your list of students!
      </Button>
    )
  }

  const handleOwner = () => {
    fetchStudents()
    setOpenDialog(!openDialog)
  }
  const fetchStudents = async () => {
    setIsLoadingStudents(true)
    const res = await fetch(`/api/tx/${id}/students/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${state.token}`,
      },
    })
    const data = await res.json()
    if (!res.ok) {
      console.log(data)
      return
    }
    setTxs(data)
    setIsLoadingStudents(false)
  }

  const renderStudent = () => {
    if (status.gave_review) {
      return (
        <Button
          variant='outlined'
          style={{ textTransform: 'none', fontSize: 16 }}
          color='primary'
          fullWidth
          disabled
        >
          Review given
        </Button>
      )
    } else if (status.is_accepted) {
      return (
        <Button
          variant='outlined'
          style={{ textTransform: 'none', fontSize: 16 }}
          color='primary'
          fullWidth
          component={Link}
          to={`${location.pathname}/review`}
        >
          Leave a review
        </Button>
      )
    } else {
      return (
        <Button
          variant='outlined'
          style={{ textTransform: 'none', fontSize: 16 }}
          color='primary'
          fullWidth
          disabled
        >
          Pending accept from tutor...
        </Button>
      )
    }
  }

  const renderRequest = () => {
    return (
      <Button
        variant='outlined'
        style={{ textTransform: 'none', fontSize: 16 }}
        color='primary'
        fullWidth
        onClick={handleRequest}
      >
        Request to be a student
      </Button>
    )
  }

  const handleRequest = async () => {
    setIsLoading(true)
    const res = await fetch(`/api/tx/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${state.token}`,
      },
      body: JSON.stringify({
        listing: `${id}`,
      }),
    })
    if (!res.ok) {
      const data = await res.json()
      console.log(data)
      setIsLoading(false)
      alert('error occurred')
      return
    }
    setStatus({
      user_type: 'student',
      is_accepted: false,
      gave_review: false,
    })
    setIsLoading(false)
  }

  const renderLoading = () => {
    return (
      <Button
        variant='outlined'
        style={{ textTransform: 'none', fontSize: 16 }}
        color='primary'
        fullWidth
        disabled
      >
        Loading...
      </Button>
    )
  }

  const renderStudentList = (txs) => {
    return txs.map((tx, index) => {
      return <Tx key={tx.id} tx={tx} />
    })
  }
  return (
    <>
      {!state.isAuthenticated
        ? renderLoginButton()
        : isLoading
        ? renderLoading()
        : renderButton()}
      <Dialog
        open={openDialog}
        onClose={handleOwner}
        scroll='paper'
        maxWidth='xs'
        fullWidth
      >
        <DialogTitle>Students</DialogTitle>
        <DialogContent dividers>
          <Grid container direction='column' spacing={4}>
            {isLoadingStudents ? 'loading...' : renderStudentList(txs)}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TxButton
