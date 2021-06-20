import React, { useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  IconButton,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@material-ui/core/";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


export default function ExpInfoModal() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <div>
        <IconButton
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
        >
          <HelpOutlineIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="form-dialog-title">How is experience earned?</DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
            Experience points are calculated using a combination
              of <br/>the module level as well as the rating received in a review.<br/>
              Level up every 200 experience points!
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
  );
}
