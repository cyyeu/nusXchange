import React, { useEffect, useState } from 'react'
import { useSnackbarContext } from '../../contexts/SnackbarContext'
import { Snackbar } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
const Success = () => {
  const { state } = useSnackbarContext()
  const [open, setOpen] = useState(state.success.open)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

	useEffect(() => {
		setOpen(state.success.open)
	}, [state.success])

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
      <Alert onClose={handleClose} severity='success'>
        <AlertTitle>Success</AlertTitle>
        {state.success.msg}
      </Alert>
    </Snackbar>
  )
}

export default Success
