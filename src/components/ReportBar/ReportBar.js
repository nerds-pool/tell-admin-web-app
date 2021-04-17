import React from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  reportBar: {
    display: "flex",
    width: "100%",
    height: "100px",
    justifyContent: "space-evenly",
    alignItems: "center",
    boxShadow: "2.5px 2.5px 2.5px 2.5px   rgba(0, 0, 0, .2)",
  },
  dataContain: {
    textAlign: "center",
  },
  typeCase: {
    fontWeight: "bold",
  },
}));

function ReportBar({ total = 0, pending = 0, solved = 0 }) {
  const classes = useStyles();
  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Card className={classes.reportBar}>
          <CardContent className={classes.dataContain}>
            <Typography>{total}</Typography>
            <Typography className={classes.typeCase}>Total Cases</Typography>
          </CardContent>
          <CardContent className={classes.dataContain}>
            <Typography>{pending}</Typography>
            <Typography className={classes.typeCase}>
              Total Pending Cases
            </Typography>
          </CardContent>
          <CardContent className={classes.dataContain}>
            <Typography>{solved}</Typography>
            <Typography className={classes.typeCase}>
              Total Solved Cases
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default ReportBar;
