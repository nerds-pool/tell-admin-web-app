import React, { useState, useEffect } from "react";
import ReportBar from "../../components/ReportBar/ReportBar";
import Complaint from "../../components/complaint/Complaint";
import { ComplaintData } from "../../FetchData/ComplaintData";
import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BubbleChart } from "@material-ui/icons";
import api from "../../api";
import { COLOR } from "../../theme/Color";

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
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await api.get.complaintsByStatus("accepted");
        console.table("All accepted complaints", response.data.result);
        setComplaints(response.data.result);
      } catch (error) {
        console.error("Error at home page", error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.marginTop}
      >
        {ComplaintData.map((val, key) => {
          if (val.status === "Accepted") {
            return (
              <Complaint
                key={key}
                title={val.title}
                desc={val.description}
                dept={val.department}
                date={val.date}
                status={val.status}
                type={val.status}
                // img={val.img}
              />
            );
          } else {
            return "";
          }
        })}
      </Grid>
    </div>
  );
}

export default OpenListPageAdmin;
