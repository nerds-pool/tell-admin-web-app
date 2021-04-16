import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { COLOR } from "../../theme/Color";
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: COLOR.navCol,
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
  },
  menu: {
    marginRight: theme.spacing(3),
  },
  title: {
    marginLeft: theme.spacing(1),
  },
  button: {
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      color: COLOR.navCol,
    },
  },
}));
function NavBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.nav}>
          <div className={classes.title}>
            <Typography variant="h6">
              Tell - Public Complaint Management System
            </Typography>
          </div>

          <div className={classes.menu}>
            <Link to="/">
              <Button className={classes.button} disableRipple>
                Home
              </Button>
            </Link>
            <Link to="/help">
              <Button className={classes.button} disableRipple>
                Help
              </Button>
            </Link>
            <Link to="/profile">
              <Button className={classes.button} disableRipple>
                Profile
              </Button>
            </Link>
            {/* <Link to="/login">
              <Button className={classes.button} disableRipple color="inherit">
                Login
              </Button>
            </Link> */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
