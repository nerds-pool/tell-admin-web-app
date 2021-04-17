import React, { useState, useEffect, useContext } from "react";
import ReportBar from "../../components/ReportBar/ReportBar";
import Complaint from "../../components/complaint/Complaint";
import { Grid, Container, Typography } from "@material-ui/core";
import { BubbleChart } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../api";
import { COLOR } from "../../theme/Color";
import { GlobalContext } from "../../context";

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(4),
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  loadIcon: {
    fontSize: 100,
    color: COLOR.navCol,
  },
  loadText: {
    color: COLOR.navCol,
  },
}));

function HomePageAdmin() {
  const classes = useStyles();
  const { filterState } = useContext(GlobalContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await api.get.complaintsByFilter(
          "open",
          filterState.category,
          filterState.authority,
          filterState.date
        );
        // console.table("All complaints", response.data.result);
        setComplaints(response.data.result);
      } catch (error) {
        console.error("Error at home page", error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [filterState]);

  if (loading)
    return (
      <Container component="main" maxWidth="xs" className={classes.loading}>
        <BubbleChart fontSize="large" className={classes.loadIcon} />
        <Typography variant="h3" className={classes.loadText}>
          Loading...
        </Typography>
      </Container>
    );

  return (
    <div className={classes.marginTop}>
      <ReportBar />
      <Grid
        // container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.marginTop}
      >
        {complaints &&
          complaints.map((val) =>
            val.status === "open" ? (
              <Complaint
                key={val._id}
                id={val._id}
                title={val.title}
                owner={val.owner}
                content={val.content}
                authority={"RDA"}
                date={`${new Date(val.createdAt).getDate()}/${
                  new Date(val.createdAt).getMonth() + 1
                }/${new Date(val.createdAt).getFullYear()}`}
                status={val.status}
                media={val.media}
                landmark={val.landmark}
                location={val.location}
                comments={val.comments}
                votes={val.votes}
              />
            ) : null
          )}
      </Grid>
    </div>
  );
}

export default HomePageAdmin;
