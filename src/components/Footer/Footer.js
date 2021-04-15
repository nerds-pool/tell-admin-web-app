import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CallIcon from "@material-ui/icons/Call";
import EmailIcon from "@material-ui/icons/Email";
import RoomIcon from "@material-ui/icons/Room";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  Typography: {
    color: "#e8e8e4",
  },
  link: {
    textDecoration: "none",
    color: "#e8e8e4",
    "&:hover": {
      color: "#ff0000",
    },
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Typography
            className={classes.Typography}
            component="h4"
            variant="outlined"
          >
            Contact Us
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography
            className={classes.Typography}
            component="h4"
            variant="outlined"
          >
            Quick Links
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography
            className={classes.Typography}
            component="h4"
            variant="outlined"
          >
            Find us On
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Typography
            className={classes.Typography}
            component="h4"
            variant="outlined"
          >
            <CallIcon></CallIcon> &nbsp; +94112654279
          </Typography>
        </Grid>
        <Grid item xs>
          <Link to="/" className={classes.link}>
            Home
          </Link>
        </Grid>
        <Grid item xs>
          <Typography className={classes.Typography} variant="outlined">
            <FacebookIcon></FacebookIcon>
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Typography className={classes.Typography} variant="outlined">
            <EmailIcon /> &nbsp; admin@tell-lk.com
          </Typography>
        </Grid>
        <Grid item xs>
          <Link to="/profile" className={classes.link}>
            Profile
          </Link>
        </Grid>
        <Grid item xs>
          <Typography className={classes.Typography} variant="outlined">
            <LinkedInIcon></LinkedInIcon>
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Typography className={classes.Typography} variant="outlined">
            <RoomIcon></RoomIcon> &nbsp; Colombo 11
          </Typography>
        </Grid>
        <Grid item xs>
          <Link to="/help" className={classes.link}>
            Help
          </Link>
        </Grid>
        <Grid item xs>
          <Typography className={classes.Typography} variant="outlined">
            <GitHubIcon></GitHubIcon>
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs>
          <Typography
            className={classes.Typography}
            component="h3"
            variant="outlined"
          ></Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography
            className={classes.Typography}
            component="h3"
            variant="outlined"
          >
            <i>Sri Lanka's #1 public complaint management system</i>
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography
            className={classes.Typography}
            variant="outlined"
          ></Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs>
          <Typography
            className={classes.Typography}
            component="h3"
            variant="outlined"
          ></Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography
            className={classes.Typography}
            component="h5"
            variant="outlined"
          >
            All Rights reserved - copyright © Tell 2021.
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography
            className={classes.Typography}
            variant="outlined"
          ></Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
