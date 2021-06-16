import React, { useState, useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  Snackbar,
  IconButton,
} from "@material-ui/core/";
import { UserContext } from "../../../contexts/UserContext";
import Divider from "../../Home/components/Divider";
import MuiAlert from "@material-ui/lab/Alert";
import { AlertTitle } from "@material-ui/lab";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import { AdvancedImage, placeholder } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { max } from "@cloudinary/base/actions/roundCorners";
import { defaultImage } from "@cloudinary/base/actions/delivery";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(-2.4),
      width: theme.spacing(120),
      height: theme.spacing(85),
    },
  },
  form: {
    width: "66%", // Fix IE 11 issue.
    //marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
  avatar: {
    border: 0,
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function EditProfile() {
  const classes = useStyles();
  const { state } = useContext(UserContext);
  const initForm = {
    first_name: "",
    last_name: "",
    bio: "",
  };
  const [form, setForm] = useState(initForm);
  const [open, setOpen] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [imageId, setImageId] = useState("placeholder");

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var token = "Token " + state.token;
    var url = `/api/user/${state.user_id}`;
    const payload = {
      first_name: form.first_name,
      last_name: form.last_name,
      bio: form.bio,
      avatar_id: imageId,
    };
    fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.ok) {
        setOpen(true);
      } else {
        setErrorSnackbar(true);
        res.text().then((text) => alert(text));
      }
    });
  };



  //handle snackbar closing
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setErrorSnackbar(false);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const url = "https://api.cloudinary.com/v1_1/nusxchange/upload";
    const formData = new FormData();
    var file = e.target.files[0];
    formData.append("file", file);
    formData.append("upload_preset", "xtgswhai");
    fetch(url, {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        setOpen(true);
        //res.text().then(text => alert(text))
        res.json().then((data) => {
          setImageId(data.public_id);
          console.log(data.public_id);
        });
      } else {
        //console.log(token)
        res.text().then((text) => alert(text));
      }
    });
  };

  //cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: "nusxchange",
    },
  });

  const profile_img = cld.image("default");
  profile_img.delivery(defaultImage("default"));
  profile_img.resize(fill().width(128).height(128)).roundCorners(max());

  return (
    <div className={classes.paper}>
      <Container component="main" maxWidth="lg">
        <Paper elevation={1}>
          <Box ml={2} pt={1}>
            <Typography component="h1" variant="h5" color="secondary">
              Edit Profile
            </Typography>
          </Box>
          <Divider />
          <Box p={2}>
            <AdvancedImage cldImg={profile_img} />
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              style={{ display: "none" }}
              id="icon-button-file"
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onChange={handleUpload}
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
          <form className={classes.form} onSubmit={handleSubmit} id="change">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="first_name"
                  variant="standard"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={form.first_name}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  name="last_name"
                  label="Last Name"
                  id="LastName"
                  autoComplete="lname"
                  value={form.last_name}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  fullWidth
                  name="bio"
                  label="Bio"
                  id="bio"
                  autoComplete="lname"
                  value={form.bio}
                  onChange={handleFormChange}
                  multiline={true}
                  rows={8}
                  rowsMax={12}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              Width="66%"
              variant="contained"
              color="primary"
              className={classes.submit}
              form="change"
            >
              Save Changes
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Alert onClose={handleClose} severity="success">
                <AlertTitle>Success</AlertTitle>
                Profile successfully saved!
              </Alert>
            </Snackbar>
            <Snackbar
              open={errorSnackbar}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Alert onClose={handleClose} severity="error">
                <AlertTitle>Error</AlertTitle>
                Error changing profile!
              </Alert>
            </Snackbar>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
