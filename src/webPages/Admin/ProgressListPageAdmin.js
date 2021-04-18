import React, { useState, useEffect, useContext } from "react";
import Complaint from "../../components/complaint/Complaint";
import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BubbleChart } from "@material-ui/icons";
import api from "../../api";
import { COLOR } from "../../theme/Color";
import { GlobalContext } from "../../context";
import ErrorSnack from "../../components/alertBox/ErrorSnack";

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(4),
    width: "100%",
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

function ProgressListPageAdmin() {
  const classes = useStyles();
  const { filterState } = useContext(GlobalContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [error, setError] = useState({
    state: undefined,
    message: undefined,
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await api.get.complaintsByFilter(
          "processing",
          filterState.category,
          filterState.authority,
          filterState.date
        );
        console.table("All processing complaints", response.data.result);
        setComplaints(response.data.result);
      } catch (error) {
        setError((prevState) => ({
            ...prevState,
            state: true,
            message: `Error while fetching progress list ${
              error.response ?? error.message
            }`,
          }));} finally {
        setLoading(false);
      }
    })();
  }, [filterState, cycle]);

  const handleUpdate = () => {
    setCycle((prevState) => prevState + 1);
  };

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
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.marginTop}
      >
        {complaints &&
          complaints.map((val) =>
            val.status === "processing" ? (
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
                onUpdate={handleUpdate}
              />
            ) : null
          )}
      </Grid>
      <ErrorSnack isVisible={error.state} message={error.message} />
    </div>
  );
}

export default ProgressListPageAdmin;
