import { Typography, CardContent, InputLabel } from "@material-ui/core";
import { Explore } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  container: {
    // position: "fixed",
    // height: "100%",
    // width: "15%",
    backgroundColor: "#edede8",
  },
  heading: {
    width: "80%",
    marginBottom: theme.spacing(4)
  },
  links: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginTop: theme.spacing(5),
  },
  link: {
    textDecoration: "none",
    width: "100%",
    color: "black",
    // margin: "8px",
    paddingTop: "10px",

    fontWeight: "bold",
    "&:hover": {
      textDecoration: "underline 2px solid #8E0D37",
      borderRadius: "5px",
    },
    "&:active": {
      color: "black",
      outline: 0,
      border: "none",
    },
    "&:focus": {
      outline: 0,
      border: "none",
    },
  },
  list: {
    paddingLeft: "20px",
    fontWeight: "normal",
  },
}));

function SideNav() {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      {/* <Typography className={classes.tabName} variant="h4"> </Typography> */}
      <CardContent className={classes.links}>
        <div className={classes.heading}>
          <InputLabel>
            <h2>
              <Explore />
              &nbsp;Menu
            </h2>
          </InputLabel>
        </div>
        <Typography className={classes.link} component={Link} to="/">
          Dashboard
        </Typography>
        <Typography className={classes.link} style={{ textDecoration: "none" }}>
          Complaints
        </Typography>
        <Typography
          className={`${classes.link} ${classes.list}`}
          component={Link}
          to="/acceptedList"
        >
          Accepted
        </Typography>
        <Typography
          className={`${classes.link} ${classes.list}`}
          component={Link}
          to="/ongoingList"
        >
          Ongoing
        </Typography>
        <Typography
          className={`${classes.link} ${classes.list}`}
          component={Link}
          to="/closedList"
        >
          Closed
        </Typography>
        <Typography
          className={`${classes.link} ${classes.list}`}
          component={Link}
          to="/rejectedList"
        >
          Rejected
        </Typography>
        {/* <Typography className={classes.link} component={Link} to="/settings">
          Add Authority User
        </Typography> */}
      </CardContent>
    </div>
  );
}

export default SideNav;
