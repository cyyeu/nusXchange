import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  IconButton,
} from "@material-ui/core/";
import ListingCard from "./ListingCard";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      width: theme.spacing(130),
    },
    marginTop: theme.spacing(-2),
    marginLeft: theme.spacing(-2),
  },
}));

const Listing = () => {
  const classes = useStyles();

  const CardRow=() => {
    return (
      <>
        <Grid item xs={3}>
          <ListingCard/>
        </Grid>
        <Grid item xs={3}>
          <ListingCard/>
        </Grid>
        <Grid item xs={3}>
          <ListingCard/>
        </Grid>
        <Grid item xs={3}>
          <ListingCard/>
        </Grid>
      </>
    );
  }

  return (
    <div className={classes.paper}>
      <Paper elevation={2}>
        <Box m = {4}>
          <Grid container spacing = {4}>
            <Grid container item xs={12} spacing={2}>
              <CardRow/>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <CardRow/>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <CardRow/>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default Listing;
