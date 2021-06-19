import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Box,
  Typography,
  IconButton,
  Divider,
  Grid,
} from "@material-ui/core/";
import TelegramIcon from "@material-ui/icons/Telegram";
import DateRangeIcon from "@material-ui/icons/DateRange";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";

const useStyles = makeStyles({
  root: {
    width: 220,
    height: 250,
  },
  mod: {
    fontSize: 14,
  },
  date: {
    fontSize: 10,
  },
});

const ListingCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Grid container item xs={12}>
          <Grid item container xs={12} sm={6}>
            <Typography
              className={classes.mod}
              color="textSecondary"
              gutterBottom
            >
              CS1101S
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
              11 Days ago
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
            Module description goes here.
          </Typography>
        </Box>
        <Box mt={3}>
          <Typography variant="body1" color="secondary">
            Free
          </Typography>
        </Box>
        <Box mt={2}>
          <Grid container item xs={12} direction="row">
            <Grid item container xs={12} sm={2}>
              <Box mt={0.3}>
                <Typography variant="body2">4.94</Typography>
              </Box>
            </Grid>
            <Grid item container xs={12} sm={2}>
              <StarBorderOutlinedIcon />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions>
        <Grid container item xs={12}>
          <Grid item container xs={12} sm={6}>
            <Box mt={-0.1}>
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
            <IconButton color="primary" component="span">
              <DateRangeIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ListingCard;
