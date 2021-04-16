import React, { useReducer, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { COLOR } from "../../theme/Color";
import api from "../../api";

const FORM_UPDATE = "FORM_UPDATE";
const FORM_RESET = "FORM_RESET";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px 20%",
    paddingTop: theme.spacing(3),
  },
  paper: {
    padding: "5px",
    margin: theme.spacing(3.7, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: "2px",
    paddingBottom: "2px",
    borderRadius: "3px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: COLOR.navCol,
    height: 50,
    "&:hover": {
      backgroundColor: COLOR.navCol,
    },
  },
  snackBar: {
    height: 60,
  },
}));

const fromReducer = (state, action) => {
  switch (action.type) {
    case FORM_UPDATE:
      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          [action.payload.id]: action.payload.value,
        },
      };
    case FORM_RESET:
      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          authorityName: "",
          username: "",
          email: "",
          contact: "",
          password: "",
        },
      };
    default:
      return state;
  }
};

const AddUser = () => {
  const classes = useStyles();

  const [snackBarProps, setSnackBarProps] = useState({
    isOpen: false,
    message: "",
  });
  const [formState, dispatchForm] = useReducer(fromReducer, {
    inputValues: {
      authorityName: "",
      username: "",
      email: "",
      contact: "",
      password: "",
    },
  });

  React.useEffect(() => {
    console.dir(formState);
  }, [formState]);

  const handleInput = (e) => {
    dispatchForm({
      type: FORM_UPDATE,
      payload: {
        id: e.target.id,
        value: e.target.value,
      },
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const {
        authorityName,
        username,
        email,
        contact,
        password,
      } = formState.inputValues;
      const body = {
        authorityName,
        username,
        email,
        contact,
        password,
      };
      const response = await api.post.newAuthorityAccount(body);
      if (!response.data.success)
        throw new Error("Failed to create new authority");
      setSnackBarProps((prevState) => ({
        ...prevState,
        isOpen: true,
        message: `${authorityName} account has been created successfully`,
      }));
    } catch (error) {
      console.error("Error at ad user", error.response ?? error.message);
      setSnackBarProps((prevState) => ({
        ...prevState,
        isOpen: true,
        message: `Failed to create new authority. Please try again...`,
      }));
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarProps((prevState) => ({
      ...prevState,
      isOpen: false,
      message: "",
    }));
  };

  return (
    <div className={classes.cardContainer}>
      <Grid container component="main" className={classes.root}>
        <Grid item sm={12} md={12} component={Paper} elevation={3} square>
          <Grid item xs={false} sm={4} md={7} className={classes.grid} />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Create New Authority Account
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                className={classes.fields}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="authorityName"
                label="Authority Name"
                value={formState.authorityName}
                onChange={handleInput}
              />
              <TextField
                className={classes.fields}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                value={formState.username}
                onChange={handleInput}
              />
              <TextField
                className={classes.fields}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                value={formState.email}
                onChange={handleInput}
              />
              <TextField
                className={classes.fields}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="contact"
                label="Contact Number"
                value={formState.contact}
                onChange={handleInput}
              />
              <TextField
                className={classes.fields}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleInput}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={handleCreate}
              >
                Create
              </Button>
            </form>
            <Snackbar
              className={classes.snackBar}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={snackBarProps.isOpen}
              autoHideDuration={6000}
              onClose={handleClose}
              message={snackBarProps.message}
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddUser;
