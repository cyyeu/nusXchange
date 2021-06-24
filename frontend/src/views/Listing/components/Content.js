import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  Divider,
} from "@material-ui/core/";
import Calendar, { DateObject } from "react-multi-date-picker";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      width: theme.spacing(125),
    },
    marginTop: theme.spacing(3),
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ratingText: {
    fontSize: 18,
  },
  textField: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.8)",
    },
  },
}));

const Content = ({ listing }) => {
  const classes = useStyles();
  const dates = listing.avail_dates;
  const [DateObjects,setDateObjects] = useState([]);
  
  function createDateObjects(dates) {
    var i = 0;
    while (i < dates.length) {
      const date = new DateObject({
        date: dates[i],
        format: "YYYY-MM-DD",
      });
      setDateObjects(DateObjects=>[...DateObjects, date]);
      i++;  
    }
    
  }

  useEffect(() => {
    createDateObjects(dates);
  },[]);



  

  return (
    <div className={classes.page}>
      <Paper elevation={2}>
        <Box m={3}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Typography variant="h4" color="secondary">
                {listing.mod_code}
              </Typography>
            </Grid>
            <Grid item container direction="row">
              <Box mt={0.1}>
                <Grid item>
                  <Typography className={classes.rating} color="primary">
                    {listing.avg_rating}
                  </Typography>
                </Grid>
              </Box>
              <Grid item>
                <Rating value={listing.avg_rating} precision={0.5} readOnly />
              </Grid>
            </Grid>
            <Grid item>
              <Typography className={classes.price} color="primary">
                {listing.price}/Hr
              </Typography>
            </Grid>
            <Grid item>
              <Divider variant="middle" />
            </Grid>
            <Grid item>
              <Typography variant="h5" color="primary">
                Description
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                className={classes.textField}
                fullWidth
                multiline={true}
                rows={10}
                value={listing.description}
                InputProps={{ disableUnderline: true }}
                disabled={true}
              />
            </Grid>
            <Grid item>
              <Typography variant="h5" color="primary">
                Availability
              </Typography>
            </Grid>
            <Grid item>
              <Calendar type="icon"  value={DateObjects} />
            </Grid>
            <Grid item container justify="flex-end">
              <Button
                variant="contained"
                style={{ textTransform: "none", fontSize: 16 }}
                color="primary"
              >
                Chat now!
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default Content;
