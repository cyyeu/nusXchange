import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,

  Paper,
  Snackbar,

  InputAdornment,
} from "@material-ui/core/";
import validator from "validator";
import MuiAlert from "@material-ui/lab/Alert";
import { AlertTitle } from "@material-ui/lab";
import styled from "styled-components";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DatePicker, {DateObject} from "react-multi-date-picker";
import { useUserContext } from "../../contexts/UserContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      width: theme.spacing(120),
      height: theme.spacing(90),
    },
    marginTop: theme.spacing(-3),
    marginLeft: theme.spacing(2),
  },
  form: {
    width: "90%",
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  pricebuttons: {
    textTransform: "none",
    fontSize: 16,
  },
  submit: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
    padding: theme.spacing(2),
  },
}));

const CreateListing = () => {
  const classes = useStyles();
  const initForm = {
    mod_code: "",
    desc: "",
    price: 0,
  };
  const initErrors = {
    mod_code: "",
    price: "",
  };
  const [form, setForm] = useState(initForm);
  const [errors, setErrors] = useState(initErrors);
  const [disablePrice, setdisablePrice] = useState(true);
  const [dates, setDates] = useState([new DateObject()]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const { state } = useUserContext();

  var avail_dates = [];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "mod_code") {
      validateMod(value);
    } else if (name === "price") {
      validatePrice(value);
    }
  };

  function validateMod(mod) {
    var modRe = new RegExp("[a-zA-Z]{2,3}[1-4]{1}[0-9]{3}");
    if (modRe.test(mod)) {
      setErrors((prevErrors) => {
        return { ...prevErrors, mod_code: "" };
      });
    } else {
      setErrors((prevErrors) => {
        return { ...prevErrors, mod_code: "Invalid module code." };
      });
    }
  }

  function validatePrice(price) {
    if (validator.isNumeric(price)) {
      setErrors((prevErrors) => {
        return { ...prevErrors, price: "" };
      });
    } else {
      setErrors((prevErrors) => {
        return { ...prevErrors, price: "Not a valid price." };
      });
    }
  }

  function convertDates() {
    dates.forEach(date => {
      var date_string = date.format("YYYY-MM-DD");
      avail_dates.push(date_string);
    })
  }



  const isDisabled = () => {
    return (
      errors.mod_code !== "" || errors.price !== "" || form.mod_code === ""
    );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  const handleSubmit = (e) => {
    convertDates();
    e.preventDefault();
    const payload = {
      mod_code: form.mod_code,
      description: form.desc,
      price: form.price,
      avail_dates: avail_dates,
    };
    var token = "Token " + state.token;
    var url = "/api/listings/";
    console.log(dates)
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      setOpenSuccess(true)
    });
  };
  return (
    <CustomGrid container justify="center" alignItems="flex-start" spacing={1}>
      <div className={classes.paper}>
        <Paper elevation={3}>
          <Grid container direction="column" spacing={2}>
            <Grid item container>
              <Box ml={4} pt={1}>
                <Typography variant="h4" color="secondary">
                  Create a listing.
                </Typography>
              </Box>
            </Grid>
            <Grid item container spacing={2} direction="row">
              <Box ml={5} pt={1}>
                <Grid item lg={6}>
                  <Button
                    className={classes.pricebuttons}
                    variant="outlined"
                    onClick={() => {
                      setdisablePrice(true);
                      setForm((form) => {
                        return { ...form, price: 0 };
                      });
                      setErrors((prevErrors) => {
                        return { ...prevErrors, price: "" };
                      });
                    }}
                  >
                    Free
                  </Button>
                </Grid>
              </Box>
              <Grid item lg={6}>
                <Button
                  className={classes.pricebuttons}
                  variant="outlined"
                  onClick={() => {
                    setdisablePrice(false);
                  }}
                >
                  Paid
                </Button>
              </Grid>
            </Grid>
            <form className={classes.form} onSubmit={handleSubmit} id="listing">
              <Grid item container lg={12} direction="column" spacing={2}>
                <Grid item container spacing={2} direction="row">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="mod_code"
                      variant="outlined"
                      id="mod_code"
                      label="Module Code"
                      value={form.mod_code}
                      placeholder="CS2100"
                      onChange={handleFormChange}
                      color="secondary"
                      helperText={errors.mod_code}
                      error={errors.mod_code !== ""}
                      autoFocus
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="price"
                      variant="outlined"
                      id="price"
                      label="Price"
                      value={form.price}
                      placeholder="10"
                      onChange={handleFormChange}
                      color="secondary"
                      helperText={errors.price}
                      error={errors.price !== ""}
                      disabled={disablePrice}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    name="desc"
                    variant="outlined"
                    id="desc"
                    label="Description"
                    value={form.desc}
                    onChange={handleFormChange}
                    color="secondary"
                    placeholder="Introduce yourself and include any details students might be interested in."
                    multiline={true}
                    rows={8}
                    rowsMax={10}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Box mt={2}>
                  <Typography variant="body1" color="primary">
                    Available dates
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <DatePicker
                  value={dates}
                  onChange={setDates}
                  multiple
                  minDate={new Date()}
                  format="YYYY-MM-DD"
                  type="input-icon"
                />
              </Grid>
            </form>
            <Grid item container justify="flex-start">
              <Button
                variant="outlined"
                type="submit"
                form="listing"
                className={classes.submit}
                disabled={isDisabled()}
              >
                Create
              </Button>
              <Snackbar
                open={openSuccess}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Alert onClose={handleClose} severity="info">
                  <AlertTitle>Success</AlertTitle>
                  Listing created.
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </CustomGrid>
  );
};

const CustomGrid = styled(Grid)`
  margin: 100px auto 0 auto;
`;
export default CreateListing;
