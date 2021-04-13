import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Button } from "@material-ui/core";

//date picker
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  heading: {
    display: "flex",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textfield: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  Button: {
    backgroundColor: "#b71c1c",
    "&:active": {
      backgroundColor: "#b71c1c",
    },
    "&:focus": {
      backgroundColor: "#b71c1c",
    },
  },
}));

const DepFilter = () => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2021-03-18T21:11:54")
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <div className={classes.heading}>
        <FilterListIcon />
        <InputLabel>
          <h2> &nbsp;Filter</h2>
        </InputLabel>
      </div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">Department</InputLabel>
        <Select native defaultValue="" id="grouped-native-select">
          <option aria-label="None" value="" />
          <option value={1}>Department 1</option>
          <option value={2}>Department 2</option>
          <option value={3}>Department 3</option>
          <option value={4}>Department 4</option>
        </Select>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>

        <Button
          className={classes.Button}
          variant="contained"
          color="secondary"
        >
          Filter
        </Button>
      </FormControl>
    </div>
  );
};

export default DepFilter;
