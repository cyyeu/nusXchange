import React, { useState } from "react";
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
import Rating from '@material-ui/lab/Rating';
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { max } from "@cloudinary/base/actions/roundCorners";
import { defaultImage } from "@cloudinary/base/actions/delivery";

const useStyles = makeStyles({
  root: {
    width: 980,
    height: 200,
  },
  first_name: {
    fontSize: 14,
  },
});

const ReviewCard = () => {
  const classes = useStyles();
  const [avatar_id, setAvatar_id] = useState("");

  const cld = new Cloudinary({
    cloud: {
      cloudName: "nusxchange",
    },
  });

  const profile_img =
    avatar_id === "" ? cld.image("default") : cld.image(avatar_id);
  profile_img.delivery(defaultImage("default"));
  profile_img.resize(fill().width(50).height(50)).roundCorners(max());

  return (
    <Card className={classes.root} elevation={0}>
      <CardContent>
        <Grid container item lg={12} spacing = {2}>
          <Grid item container lg={12} spacing={2}>
            <Grid item>
              <AdvancedImage cldImg={profile_img} />
            </Grid>
            <Grid item>
              <Box mt={1}>
                <Typography
                  className={classes.first_name}
                  color="primary"
                >
                  Chen Yuan
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box mt={1}>
                <Typography
                  className={classes.first_name}
                  color="textSecondary"
                >
                  2 days ago
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item container lg={12} spacing={2}>
            <Rating name="read-only" value={3} readOnly />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
