import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@material-ui/core/";
import { Alert } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(-2.4),
      width: theme.spacing(120),
      height: theme.spacing(85),
    },
  },
}));

export default function EditPassword() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Container component="main" maxWidth="lg">
        <Paper elevation={2}>
          <Typography component="h1" variant='h5' color = 'secondary'>Edit Profile</Typography>
        </Paper>
      </Container>
    </div>
  );
}