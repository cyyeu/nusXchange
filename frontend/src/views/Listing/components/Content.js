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
  Modal,
} from "@material-ui/core/";
import StarIcon from "@material-ui/icons/Star";
import TelegramIcon from "@material-ui/icons/Telegram";
import { useHistory } from "react-router-dom";
import Calendar, { DateObject } from "react-multi-date-picker";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { max } from "@cloudinary/base/actions/roundCorners";
import { defaultImage } from "@cloudinary/base/actions/delivery";
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

const Content = () => {
  const classes = useStyles();
  const history = useHistory();
  const [avatar_id, setAvatar_id] = useState("");
  const bio =
    "Hi, My name is Chen Yuan! I am a dank CS student and I like to drink beer! HMU for CS related content, not history though.";
  const desc =
    "My name is Chen Yuan! I am a dank CS student and I Teach u how to use get A for CS xd ";

  const cld = new Cloudinary({
    cloud: {
      cloudName: "nusxchange",
    },
  });
  const profile_img =
    avatar_id === "" ? cld.image("default") : cld.image(avatar_id);
  profile_img.delivery(defaultImage("default"));
  profile_img.resize(fill().width(150).height(150)).roundCorners(max());

  const dates = [new DateObject(), new DateObject().add(5, "days")];

  return (
    <div className={classes.page}>
      <Paper elevation={2}>
        <Box m={3}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Typography variant="h4" color="secondary">
                CS1101S
              </Typography>
            </Grid>
            <Grid item container direction="row">
              <Grid item>
                <Typography className={classes.rating} color="primary">
                  4.50
                </Typography>
              </Grid>
              <Grid item>
                <Rating
                  defaultValue={4.5}
                  precision={0.5}
                  readOnly
                />
              </Grid>
            </Grid>
            <Grid item>
              <Typography className={classes.price} color="primary">
                10/Hr
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
                value={desc}
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
              <Calendar type="icon" value={dates} />
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
