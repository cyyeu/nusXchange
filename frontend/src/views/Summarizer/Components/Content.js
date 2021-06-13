import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
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
} from "@material-ui/core/";

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
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    //padding: theme.spacing(2),
  },
  textbox: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    //marginRight: theme.spacing(3),
    height: theme.spacing(75),
  },
  inputText: {
    width: "95%",
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(1),
  },
  outputText: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
}));

const Content = () => {
  const classes = useStyles();
  const initForm = {
    num_sentences: "",
    min_length: "",
    max_length: "",
    input_text: "",
  };
  const [form, setForm] = useState(initForm);
  const [summary, setSummary] = useState("");
  const [url, setUrl] = useState("");

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const isDisabled = () => {
    return (
      form.num_sentences === "" ||
      form.min_length === "" ||
      form.max_length === "" ||
      form.input_text === ""
    );
  };

  return (
    <div className={classes.paper}>
      <Paper elevation={5}>
        <Grid container direction="column">
          <Grid
            item
            container
            alignItems="flex-start"
            xs={12}
            direction="row"
            spacing={10}
          >
            <Grid item>
              <Box ml={2} pt={3}>
                <Typography variant="h4" color="secondary">
                  Summarizer
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <form className={classes.form} id="summarize">
                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  spacing={6}
                  alignItems="center"
                >
                  <Grid item xs={3}>
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
                  <Grid item xs={3}>
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
                  <Grid item xs={3}>
                    <TextField
                      name="num_sentences"
                      variant="standard"
                      fullWidth
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
          <Grid item container lg={12} direction="row">
            <Grid item lg={6}>
              <form className={classes.inputText} id="summarize">
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
                />
              </form>
            </Grid>
            <Grid item>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item lg={5}>
              <form className={classes.outputText}>
                <TextField
                  fullWidth
                  multiline={true}
                  rows={30}
                  value="Summarized content goes here."
                  InputProps={{ disableUnderline: true }}
                  disabled={true}
                />
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Content;
