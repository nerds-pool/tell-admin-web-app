import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormLabel } from "@material-ui/core";
import { GlobalContext } from "../../context";
import api from "../../api";
import { COLOR } from "../../theme/Color";
import { BubbleChart } from "@material-ui/icons";
import ErrorSnack from "../../components/alertBox/ErrorSnack";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: COLOR.navCol,
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
    height: 50,
    margin: theme.spacing(3, 0, 2),
    backgroundColor: COLOR.navCol,
    "&:hover": {
      backgroundColor: COLOR.navCol,
    },
  },
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
    width: "100%",
    textAlign: "center",
    height: "40px",
    borderRadius: "5px",
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  loadIcon: {
    fontSize: 100,
    color: COLOR.navCol,
  },
  loadText: {
    color: COLOR.navCol,
  },
}));

const Profile = () => {
  const classes = useStyles();

  const { userState } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});

  const [error, setError] = useState({
    state: undefined,
    message: undefined,
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const userId = userState.data.id;
        const response = await api.get.profile(userId);
        if (!response.data.success)
          throw new Error("Fetch admin profile failed");
        console.dir(response.data.result);
        setProfile((prevState) => ({ ...prevState, ...response.data.result }));
      } catch (error) {
        setError((prevState) => ({
            ...prevState,
            state: true,
            message: `Error while fetching admin profile ${
              error.response ?? error.message
            }`,
          }));
        } finally {
        setLoading(false);
      }
    })();
  }, [userState]);

  if (loading)
    return (
      <Container component="main" maxWidth="xs" className={classes.loading}>
        <BubbleChart fontSize="large" className={classes.loadIcon} />
        <Typography variant="h3" className={classes.loadText}>
          Loading...
        </Typography>
      </Container>
    );

  return (
    <Container component="main" maxWidth="sm">
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
            <FormLabel className={classes.FormLabel}>Authority</FormLabel>
            <Typography className={classes.fields}>
              {profile.authorityName ?? " "}
            </Typography>
          </div>
          <div className={classes.row}>
            <FormLabel className={classes.FormLabel}>Username</FormLabel>
            <Typography className={classes.fields}>
              {profile.username ?? " "}
            </Typography>
          </div>
          <div className={classes.row}>
            <FormLabel className={classes.FormLabel}>Email</FormLabel>
            <Typography className={classes.fields}>
              {profile.email ?? " "}
            </Typography>
          </div>
          <div className={classes.row}>
            <FormLabel className={classes.FormLabel}>Contact</FormLabel>
            <Typography className={classes.fields}>
              {profile.contact ?? " "}
            </Typography>
          </div>
          <Grid container></Grid>
        </form>
      </div>
          <ErrorSnack isVisible={error.state} message={error.message} />
    </Container>
  );
};

export default Profile;
