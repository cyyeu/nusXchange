import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  Box,
  Typography,
  IconButton,
  Divider,
  Grid,
} from "@material-ui/core/";
import TelegramIcon from "@material-ui/icons/Telegram";
import Calendar, { DateObject } from "react-multi-date-picker";
import StarIcon from "@material-ui/icons/Star";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 220,
    height: 250,
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.1)",
  },
  mod: {
    fontSize: 14,
  },
  date: {
    fontSize: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "fontWeightMedium",
  },
});

const ListingCard = ({ listing }) => {
  const classes = useStyles();
  const history = useHistory();
  const dates = listing.avail_dates;
  const [DateObjects, setDateObjects] = useState([]);

  function createDateObjects(dates) {
    var i = 0;
    while (i < dates.length) {
      const date = new DateObject({
        date: dates[i],
        format: "YYYY-MM-DD",
      });
      setDateObjects((DateObjects) => [...DateObjects, date]);
      i++;
    }
  }

  useEffect(() => {
    createDateObjects(dates);
  }, []);

  const handleCardClick = () => {
    history.push(`/listing/${listing.id}`);
  };

  const price = listing.price === 0 ? "Free" : `${listing.mod_price}/Hr`;
  // calculate relative days from current time
  const date = new Date(listing.date_created.slice(0, -1));
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <Grid item xs={3}>
      <Card className={classes.root}>
        <CardActionArea component="a" onClick={handleCardClick}>
          <CardContent>
            <Grid container item xs={12}>
              <Grid item container xs={12} sm={6}>
                <Typography
                  className={classes.mod}
                  color="textSecondary"
                  gutterBottom
                >
                  {listing.mod_code}
                </Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={6}
                alignItems="center"
                justify="flex-end"
              >
                <Typography
                  className={classes.date}
                  color="textSecondary"
                  gutterBottom
                >
                  {diffDays} days ago
                </Typography>
              </Grid>
            </Grid>
            <Divider></Divider>
            <Box mt={1}>
              <Typography
                variant="body2"
                component="p"
                color="textSecondary"
                noWrap
              >
                {listing.description}
              </Typography>
            </Box>
            <Box mt={3}>
              <Typography
                variant="body1"
                align="left"
                color={listing.price ? "primary" : "secondary"}
                className={classes.price}
              >
                {listing.price ? listing.price + "/Hr" : "Free"}
              </Typography>
            </Box>
            <Box mt={2}>
              <Grid container item xs={12} direction="row">
                <Grid item container xs={12} sm={2}>
                  <Box mt={0.3}>
                    <Typography variant="body2">
                      {listing.avg_rating.toFixed(2)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <StarIcon style={{ color: "FF5A60" }} />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Grid container item xs={12}>
            <Grid item container xs={12} sm={6}>
              <Box ml={-0.5} mt={-0.5}>
                <IconButton color="primary" component="span">
                  <TelegramIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={6}
              alignItems="center"
              justify="flex-end"
            >
              <Calendar type="icon" value={DateObjects} />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ListingCard;
