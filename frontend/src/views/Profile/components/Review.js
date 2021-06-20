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
  Divider,
} from "@material-ui/core/";
import ReviewCard from "./ReviewCard";

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

const Review = () => {
  const classes = useStyles();


  return (
    <div className={classes.paper}>
      <Paper elevation={2}>
        <Box m = {4}>
          <Grid container spacing = {4}>
            <Grid container item xs={12} spacing={2}>
              <ReviewCard/>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Divider style={{width:'100%'}}/>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <ReviewCard/>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Divider style={{width:'100%'}} />
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <ReviewCard/>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Divider style={{width:'100%'}}/>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default Review;
