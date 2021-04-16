import React, { useState, useEffect, useReducer, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import api from "../../api";
import { GlobalContext } from "../../context";
import { setUser, setAuth, setTokens } from "../../context/actions";
import { useHistory } from "react-router-dom";
import { COLOR } from "../../theme/Color";

const FORM_UPDATE = "FORM_UPDATE";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: COLOR.navCol,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: 50,
    backgroundColor: COLOR.navCol,
    "&:hover": {
      backgroundColor: COLOR.navCol,
    },
  },
  error: {
    marginTop: theme.spacing(2)
  }
}));

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_UPDATE:
      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          [action.payload.key]: action.payload.value,
        },
      };
    default:
      return state;
  }
};

const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const { userState, tokenState, dispatchUser, dispatchToken } = useContext(
    GlobalContext
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      password: "",
      username: "",
    },
    validationValues: {
      password: "",
      username: "",
    },
  });

  useEffect(() => {
    console.log("User from context", userState);
    console.log("Token State", tokenState);
  }, [userState, tokenState]);

  const handleInput = (e) => {
    formDispatch({
      type: FORM_UPDATE,
      payload: {
        key: e.target.id,
        value: e.target.value,
      },
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const signinBody = {
        username: formState.inputValues.username,
        password: formState.inputValues.password,
      };
      const response = await api.post.signIn(signinBody);
      console.log("Admin doc", response.data.result);

      const user = {
        id: response.data.result.id,
        role: response.data.result.role,
      };
      const signToken = response.data.result.signToken;
      const refToken = response.data.result.refToken;

      await dispatchToken(setTokens(signToken, refToken));
      await dispatchUser(setUser(user));
      await dispatchUser(setAuth(true));

      localStorage.setItem("signToken", signToken);
      localStorage.setItem("refToken", refToken);

      history.push("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Invalid username or password");
      }
      if (error.response && error.response.status === 500) {
        alert(
          "Oops!",
          "Something went wrong with our servers :( Try again later..."
        );
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentIndIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Log In
        </Typography>
        <Typography color="error" className={classes.error}>{errorMsg}</Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={formState.inputValues.username}
            onChange={handleInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formState.inputValues.password}
            onChange={handleInput}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Log In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
