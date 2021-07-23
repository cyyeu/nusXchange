import React, { useState, useEffect } from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useSnackbarContext } from '../../contexts/SnackbarContext'
const Error = () => {
  const { state } = useSnackbarContext()
  const [open, setOpen] = useState(state.error.open)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    setOpen(state.error.open)
  }, [state.error])

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Alert onClose={handleClose} severity='error'>
        <AlertTitle>Error</AlertTitle>
        {state.error.msg}
      </Alert>
    </Snackbar>
  )
}

export default Error
