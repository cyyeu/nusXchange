import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Grid,
} from "@material-ui/core/";
import Rating from "@material-ui/lab/Rating";
import ExpInfoModal from "./ExpInfoModal";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { max } from "@cloudinary/base/actions/roundCorners";
import { defaultImage } from "@cloudinary/base/actions/delivery";

const useStyles = makeStyles({
  root: {
    width: 980,
    height: 250,
  },
  first_name: {
    fontSize: 16,
  },
  date: {
    fontSize: 14,
  },
  exp: {
    fontSize: 14,
  },
  descTextField: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.7)",
    },
  },
});

const ReviewCard = () => {
  const classes = useStyles();
  const [avatar_id, setAvatar_id] = useState("");

  const initReviewInfo = {
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elit augue, interdum ac dignissim sit amet, condimentum ut nisl. Sed dapibus velit elit, vitae mattis metus finibus mattis. Ut vitae sodales purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec tincidunt odio eget auctor finibus. Integer at eleifend ante. Phasellus volutpat porttitor congue. Maecenas",
    rating: 4,
    date_created: "",
    owner_id:"",
    exp:500,
  };
  const [ReviewInfo,setReviewInfo] = useState(initReviewInfo);

  const renderExp = `${ReviewInfo.exp} experience gained.`;

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
        <Grid container item lg={12} spacing={2}>
          <Grid item container lg={12} spacing={2}>
            <Grid item>
              <AdvancedImage cldImg={profile_img} />
            </Grid>
            <Grid item>
              <Box mt={2}>
                <Typography className={classes.first_name} color="primary">
                  Chen Yuan
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box mt={2.2}>
                <Typography className={classes.date} color="textSecondary">
                  2 days ago
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item container lg={12} spacing={2}>
            <Grid item>
              <Rating name="read-only" value={ReviewInfo.rating} readOnly />
            </Grid>
            <Grid item>
              <Box mt={0.4}>
                <Typography className={classes.exp} color="textSecondary">
                {renderExp}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box mt={-1.3}>
                <ExpInfoModal />
              </Box>
            </Grid>
          </Grid>
          <Grid item lg={12}>
            <TextField
              className={classes.descTextField}
              fullWidth
              multiline={true}
              rows={5}
              value={ReviewInfo.desc}
              InputProps={{ disableUnderline: true }}
              disabled={true}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
