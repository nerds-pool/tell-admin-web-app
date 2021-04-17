import "date-fns";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Grid, Select, InputLabel } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { COLOR } from "../../theme/Color";
import api from "../../api";

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
  const [filterData, setFilterData] = useState({
    categories: [],
    authorities: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get.filterData();
        console.log("Filter Data", response.data.result);
        setFilterData((prevState) => ({
          ...prevState,
          categories: response.data.result.categories,
          authorities: response.data.result.authorities,
        }));
      } catch (error) {
        console.log(
          "Error while fetching filter data",
          error.response ?? error.message
        );
      }
    })();
  }, []);

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
          {filterData.categories &&
            filterData.categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
        </Select>

        <Select
          native
          id="authority"
          className={classes.Select}
          onChange={handleSelect}
        >
          <option value="all">All Authorities</option>
          {filterData.authorities&&
            filterData.authorities.map((authority) => (
              <option key={authority._id} value={authority._id}>
                {authority.authorityName}
              </option>
            ))}
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
