import React, { useState, useEffect, useContext } from "react";
import ReportBar from "../../components/ReportBar/ReportBar";
import Complaint from "../../components/complaint/Complaint";
import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BubbleChart } from "@material-ui/icons";
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

function OpenListPageAdmin() {
  const classes = useStyles();
  const { filterState } = useContext(GlobalContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await api.get.complaintsByFilter(
          "accepted",
          filterState.category,
          filterState.authority,
          filterState.date
        );
        console.table("All accepted complaints", response.data.result);
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
      <Grid
        // container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.marginTop}
      >
        {complaints &&
          complaints.map((val) =>
            val.status === "accepted" ? (
              <Complaint
                key={val._id}
                id={val._id}
                status={val.status}
                votes={val.votes}
                owner={val.owner}
                title={val.title}
                content={val.content}
                location={val.location}
                landmark={val.landmark}
                media={val.media}
                comments={val.comments}
                date={`${new Date(val.createdAt).getDate()}/${
                  new Date(val.createdAt).getMonth() + 1
                }/${new Date(val.createdAt).getFullYear()}`}
                authority={val.authority}
                category={val.category}
              />
            ) : null
          )}
      </Grid>
    </div>
  );
}

export default OpenListPageAdmin;
