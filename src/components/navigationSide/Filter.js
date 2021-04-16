import "date-fns";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Grid, Select, InputLabel } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { COLOR } from "../../theme/Color";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    display: "flex",
    marginTop: theme.spacing(7),
    justifyContent: "center",
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
    backgroundColor: COLOR.navCol,
    color: theme.palette.common.white,
    width: "90%",
    "&:hover": {
      backgroundColor: "#b71c1c",
    },
  },
  Select: {
    marginTop: theme.spacing(3),
    width: "90%",
  },
}));

const Filter = ({ onFilter, onReset }) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date, value) => {
    setSelectedDate(date);
    const e = {
      target: {
        id: "date",
        value: new Date(date).toISOString(),
      },
    };
    onFilter(e);
  };

  const handleSelect = (e) => {
    console.log("Selected", e.target.id);
    onFilter(e);
  };

  return (
    <div>
      <div className={classes.heading}>
        <FilterListIcon />
        <InputLabel>
          <h2> &nbsp;Filter</h2>
        </InputLabel>
      </div>
      <Box className={classes.formControl}>
        <Select
          native
          id="category"
          className={classes.Select}
          onChange={handleSelect}
        >
          <option value="all">All Categories</option>
          <option value="road">Road</option>
          <option value="garbage">Garbage</option>
        </Select>

        <Select
          native
          id="authority"
          className={classes.Select}
          onChange={handleSelect}
        >
          <option value="all">All Authorities</option>
          <option value="police">Police</option>
          <option value="rda">RDA</option>
        </Select>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              className={classes.Select}
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date"
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
          onClick={onReset}
        >
          Reset
        </Button>
      </Box>
    </div>
  );
};

export default Filter;
