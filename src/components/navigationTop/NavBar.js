import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import {
  Home,
  AccountCircle,
  PersonAdd,
  Help,
  ExitToApp,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { COLOR } from "../../theme/Color";
import { GlobalContext } from "../../context";
import { resetUser } from "../../context/actions";

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
  const { dispatchUser } = useContext(GlobalContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await dispatchUser(resetUser());
    } catch (error) {
      console.log("Error while log out", error.message);
    }
  };

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
              <IconButton className={classes.button} disableRipple>
                <Home />
              </IconButton>
            </Link>
            <Link to="/help">
              <IconButton className={classes.button} disableRipple>
                <Help />
              </IconButton>
            </Link>
            <Link to="/create">
              <IconButton
                className={classes.button}
                disableRipple
                color="inherit"
              >
                <PersonAdd />
              </IconButton>
            </Link>
            <Link to="/profile">
              <IconButton className={classes.button} disableRipple>
                <AccountCircle />
              </IconButton>
            </Link>
            <IconButton
              className={classes.button}
              onClick={handleLogout}
              disableRipple
            >
              <ExitToApp />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
