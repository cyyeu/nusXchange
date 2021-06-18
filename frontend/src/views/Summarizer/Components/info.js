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
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Link } from "react-router-dom";
import { MemoryRouter } from "react-router";

export default function Info() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const LinkBehavior = React.forwardRef((props, ref) => (
    <Link
      ref={ref}
      to={{
        pathname: "https://pypi.org/project/bert-extractive-summarizer/",
      }}
      target="_blank"
      {...props}
    />
  ));

  return (
    <MemoryRouter>
      <div>
        <IconButton
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
        >
          <InfoOutlinedIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="form-dialog-title">Summarizer</DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              This summarizer is a deployment of the BERT extractive summarizer library.<br/>
              
            </DialogContentText>
            <DialogContentText>
            To use, provide either raw text or the link to a news article and input the required parameters.<br/>
              Max Length: maximum length to accept as a sentence.<br/>
              Min Length: minimum length to accept as a sentence.<br/>
              Output Sentences: number of output sentences in the summary.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button component={LinkBehavior} color="primary">
              More Info
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </MemoryRouter>
  );
}