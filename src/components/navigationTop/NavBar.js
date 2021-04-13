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
    // color:'white'
  },
  menu: {
    marginLeft: "75%",
  },
}));
function NavBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.nav}>
          <div className="title">
            <Typography variant="h6" className={classes.title}>
              Tell
            </Typography>
          </div>

          <div className={classes.menu}>
            <Link to="/">
              <Button disableRipple>Home</Button>
            </Link>
            <Link to="/help">
              <Button disableRipple>Help</Button>
            </Link>
            <Button disableRipple>Profile</Button>
            <Link to="/login">
              <Button disableRipple color="inherit">
                Login
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
