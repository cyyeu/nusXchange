import React, { useState, useContext, useEffect } from "react";
import { Grid, Paper, Typography, Box, IconButton } from "@material-ui/core";
import { useUserContext } from "../../../contexts/UserContext";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { max } from "@cloudinary/base/actions/roundCorners";
import { defaultImage } from "@cloudinary/base/actions/delivery";
import { getLevel } from "../../../utils";
import { useParams } from "react-router-dom";
import { Telegram, LinkedIn } from "@material-ui/icons";

const Sidebar = ({ owner }) => {
  const { state } = useUserContext();
  const { id } = useParams();
  const cld = new Cloudinary({
    cloud: {
      cloudName: "nusxchange",
    },
  });
  console.log(owner);
  const profile_img =
    owner.avatar_id === "" ? cld.image("default") : cld.image(owner.avatar_id);
  profile_img.delivery(defaultImage("default"));
  profile_img.resize(fill().width(150).height(150)).roundCorners(max());
  const level = getLevel(owner.xp);

  //to delete
  const placeholder_bio =
    "Hi, My name is Chen Yuan! I am a dank CS student and I like to drink beer! HMU for CS related content, not history though.";

  return (
    <Grid
      item
      container
      alignItems="flex-start"
      xs={2}
      direction="column"
      spacing={2}
    >
      <Grid item>
        <Typography variant="h4" color="secondary">
          Meet your tutor.
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4" color="primary">
          {owner.first_name + " " + owner.last_name}
        </Typography>
      </Grid>
      <Grid item>
        <Box ml={1}>
          <AdvancedImage cldImg={profile_img} />
        </Box>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Level {level}</Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="body2" align="left">
          {placeholder_bio}
        </Typography>
      </Grid>
      <Grid item container direction="row" spacing={1}>
        <IconButton
          onClick={() => (window.location = "https://t.me/jethrokyq")}
        >
          <Telegram />
        </IconButton>
        <IconButton
          onClick={() =>
            (window.location =
              "https://www.linkedin.com/in/chen-yuan-yeu-1465901b5/")
          }
        >
          <LinkedIn />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
