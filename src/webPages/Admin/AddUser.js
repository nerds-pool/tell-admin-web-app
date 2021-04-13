import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// Card
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "70vh",
  },
  cardContainer: {
    margin: "20px",
    height: "700px",
  },
  card: {
    marginBottom: "20px",
    width: "50%",
    border: "3px solid blue",
  },
  Cardlist: {
    content: "justify",
    /*margin: "auto",*/
    width: "50%",
    /* border: "3px solid blue",*/
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pos: {
    marginBottom: "20px",
  },
  paper: {
    padding: "5px",
    margin: theme.spacing(3.7, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
    backgroundColor: "#b71c1c",
  },
  FormControl: {
    width: "1000px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const AddUser = () => {
  const classes = useStyles();

  const [Authority, setAuthority] = React.useState("");

  const handleChange = (event) => {
    setAuthority(event.target.value);
  };

  return (
    <div className={classes.cardContainer}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Grid item xs={false} sm={4} md={7} className={classes.grid} />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Create User
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                className={classes.fields}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Fname"
                label="First Name"
                name="Fname"
                autoComplete="First Name"
                autoFocus
              />
              <TextField
                className={classes.fields}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Lname"
                label="Last Name"
                name="Lname"
                autoComplete="Last Name"
                autoFocus
              />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Authority</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Authority}
                  onChange={handleChange}
                >
                  <MenuItem value={10}></MenuItem>
                  <MenuItem value={10}>Authority 1</MenuItem>
                  <MenuItem value={20}>Authority 2</MenuItem>
                  <MenuItem value={30}>Authority 3</MenuItem>
                </Select>
              </FormControl>

              <TextField
                className={classes.fields}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                className={classes.fields}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="UserId"
                label="User ID"
                name="UserId"
                autoComplete="User ID"
                autoFocus
              />
              <TextField
                className={classes.fields}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Create User
              </Button>
            </form>
          </div>
        </Grid>
        <div className={classes.Cardlist}>
          <Card className={classes.card}>
            <CardContent className={classes.pos}>
              <Typography color="textPrimary">Police Dept.</Typography>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent className={classes.pos}>
              <Typography color="textPrimary">RDA</Typography>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </div>
  );
};

export default AddUser;
