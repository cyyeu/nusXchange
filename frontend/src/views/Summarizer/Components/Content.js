import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  Snackbar,
  Divider,
  IconButton,
} from "@material-ui/core/";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import MuiAlert from "@material-ui/lab/Alert";
import { AlertTitle } from "@material-ui/lab";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      width: theme.spacing(150),
      height: theme.spacing(95),
    },
    marginTop: theme.spacing(-3),
    marginLeft: theme.spacing(-2),
  },
  form: {
    width: "90%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textbox: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    height: theme.spacing(75),
  },
  inputText: {
    width: "95%",
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(1),
  },
  outputTextField: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.7)",
    },
  },
  outputText: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

const Content = () => {
  const classes = useStyles();
  const initForm = {
    num_sentences: "",
    min_length: "",
    max_length: "",
    input_text: "",
    url: "",
  };
  const [form, setForm] = useState(initForm);
  const [summary, setSummary] = useState("Summarized content goes here.");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("testing");

  //handle snackbar closing
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
    setOpenError(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const isDisabled = () => {
    return (
      form.num_sentences === "" ||
      form.min_length === "" ||
      (form.max_length === "" && (form.input_text === "" || form.url === ""))
    );
  };

  const handleDocument = () => {
    setOpenSuccess(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.url === "") {
      const smrzr_url = `https://api.smrzr.io/v1/summarize?num_sentences=${form.num_sentences}&algorithm=kmeans&min_length=${form.min_length}&max_length=${form.max_length}`;
      fetch(smrzr_url, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: form.input_text,
      })
        .then((res) => {
          res.json().then((data) => {
            setSummary(data.summary);
          });
        })
        .catch((error) => {
          setErrorMsg(error);
          setOpenError(true);
        });
    } else {
      const smrzr_url = `https://api.smrzr.io/v1/summarize/news?num_sentences=${form.num_sentences}&algorithm=kmeans&min_length=${form.min_length}&max_length=${form.max_length}`;
      const payload = { url: form.url };
      fetch(smrzr_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          res.json().then((data) => {
            setSummary(data.summary);
          });
        })
        .catch((error) => {
          setOpenError(true);
        });
    }
  };

  return (
    <div className={classes.paper}>
      <Paper elevation={5}>
        <Grid container direction="column">
          <Grid item container alignItems="flex-start" xs={12} direction="row">
            <Grid item xs={6}>
              <Box ml={1} pt={3}>
                <Typography variant="h4" color="secondary">
                  Summarizer
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <form
                className={classes.form}
                onSubmit={handleSubmit}
                id="summarize"
              >
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  spacing={5}
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <TextField
                      name="max_length"
                      variant="standard"
                      id="max_length"
                      label="Max Length"
                      value={form.max_length}
                      onChange={handleFormChange}
                      size="small"
                      color="secondary"
                      helperText="Recommended: 500"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      name="min_length"
                      variant="standard"
                      id="min_length"
                      label="Min Length"
                      value={form.min_length}
                      onChange={handleFormChange}
                      size="small"
                      color="secondary"
                      helperText="Recommended: 40"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      name="num_sentences"
                      variant="standard"
                      id="num_sentences"
                      label="Output Sentences"
                      value={form.num_sentences}
                      onChange={handleFormChange}
                      size="small"
                      color="secondary"
                      helperText="Recommended: 10"
                    />
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item container md={12} direction="row">
            <Grid item md={6}>
              <form
                className={classes.inputText}
                onSubmit={handleSubmit}
                id="summarize"
              >
                <TextField
                  name="input_text"
                  id="input_text"
                  label="Paste or write text here."
                  value={form.input_text}
                  onChange={handleFormChange}
                  fullWidth
                  multiline={true}
                  rows={30}
                  InputProps={{ disableUnderline: true }}
                  disabled={form.url !== ""}
                />
              </form>
            </Grid>
            <Grid item>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item md={5}>
              <form className={classes.outputText}>
                <TextField
                  className={classes.outputTextField}
                  fullWidth
                  multiline={true}
                  rows={30}
                  value={summary}
                  InputProps={{ disableUnderline: true }}
                  disabled={true}
                />
              </form>
            </Grid>
          </Grid>
          <Grid
            item
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="row"
          >
            <Grid item container lg={6}>
              <Grid item lg={2}>
                <Box mt={1} ml={2}>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleDocument}
                    style={{ display: "none" }}
                    id="icon-button-file"
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload pdf"
                      component="span"
                      onChange={handleDocument}
                      size="medium"
                    >
                      <CloudUploadOutlinedIcon />
                    </IconButton>
                  </label>
                </Box>
              </Grid>
              <Grid item lg={7}>
                <form onSubmit={handleSubmit} id="summarize">
                  <TextField
                    name="url"
                    variant="standard"
                    fullWidth
                    id="url"
                    label="...Or Paste Link to News Article"
                    value={form.url}
                    onChange={handleFormChange}
                    size="small"
                    color="secondary"
                    disabled={form.input_text !== ""}
                  />
                </form>
              </Grid>
              <Grid item lg={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  form="summarize"
                  disabled={isDisabled()}
                  className={classes.submit}
                >
                  Summarize
                </Button>
                <Snackbar
                  open={openSuccess}
                  autoHideDuration={3000}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Alert onClose={handleClose} severity="info">
                    <AlertTitle>Success</AlertTitle>
                    Document uploaded.
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={openError}
                  autoHideDuration={3000}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Alert onClose={handleClose} severity="error">
                    <AlertTitle>Error!</AlertTitle>
                    {errorMsg}
                  </Alert>
                </Snackbar>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Content;
