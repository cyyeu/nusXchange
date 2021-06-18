import React, { useState, useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Typography, LinearProgress } from "@material-ui/core";
import { UserContext } from "../../../contexts/UserContext";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { max } from "@cloudinary/base/actions/roundCorners";
import { defaultImage } from "@cloudinary/base/actions/delivery";


const Sidebar = () => {
  const { state } = useContext(UserContext);
  const token = "Token " + state.token;
  const url = `/api/user/${state.user_id}`;
  const initUserInfo = {
    first_name: "",
    bio: "",
    avatar_id: "",
    xp: "",
  };
  const [userInfo, setUserInfo] = useState(initUserInfo);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetch(url).then(response=>response.json())
    .then(data => {
      setUserInfo({
        ...userInfo,
        first_name: data.first_name,
        xp: data.xp,
        bio: data.bio,
        avatar_id:data.avatar_id,
      })
    });
  }

  //cloudinary instance and code
  const cld = new Cloudinary({
    cloud: {
      cloudName: "nusxchange",
    },
  });

  const profile_img = userInfo.avatar_id === "" ?  cld.image("default"): cld.image(userInfo.avatar_id) ;
  profile_img.delivery(defaultImage("default"));
  profile_img.resize(fill().width(150).height(150)).roundCorners(max());
    

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
          Hello {userInfo.first_name}.
        </Typography>
      </Grid>
      <Grid item>
        <AdvancedImage cldImg={profile_img} />
      </Grid>
      <Grid item>
        <Typography variant="body2">Level 5</Typography>
        <LinearProgress
          style={{ width: "200px" }}
          variant="determinate"
          value={90}
          color="secondary"
        />
        <Typography variant="body2">
          100 experience points to next level
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="body2" align="left">
          {userInfo.bio}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
