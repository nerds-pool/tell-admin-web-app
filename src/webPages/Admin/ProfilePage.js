import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    padding: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "5px",
    borderRadius: "5px",
    marginTop: theme.spacing(1),
    backgroundColor: "#f2f2f2",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#b71c1c",
  },
  // fields: {
  //   outline: theme.spacing(1),
  // },
  row: {
    display: "flex",
    padding: "10px",
  },
  FormLabel: {
    width: "120px",
    textAlign: "start",
    marginRight: "5px",
    textDecorationColor: "black",
  },
  fields: {
    paddingTop: "10px",
    backgroundColor: "#e8e8e4",
    width: "250px",
    textAlign: "center",
    height: "40px",
    borderRadius: "5px",
  },
}));

const Profile = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Personal Information
        </Typography>
        <form className={classes.form} noValidate>
          <div className={classes.row}>
            <FormLabel className={classes.FormLabel}>First Name </FormLabel>
            <Typography className={classes.fields} variant="outlined">
              Suchith
            </Typography>
          </div>
          <div className={classes.row}>
            <FormLabel className={classes.FormLabel}>Last Name</FormLabel>
            <Typography className={classes.fields} variant="outlined">
              Fernando
            </Typography>
          </div>
          <div className={classes.row}>
            <FormLabel className={classes.FormLabel}>Authority</FormLabel>
            <Typography className={classes.fields} variant="outlined">
              Authority
            </Typography>
          </div>
          <div className={classes.row}>
            <FormLabel className={classes.FormLabel}>Role</FormLabel>
            <Typography className={classes.fields} variant="outlined">
              Role
            </Typography>
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="confirm-password"
            id="confirm-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            align="center"
            className={classes.submit}
          >
            Update
          </Button>
          <Grid container></Grid>
        </form>
      </div>
    </Container>
  );
};

export default Profile;
