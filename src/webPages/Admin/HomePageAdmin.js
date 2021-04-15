import React, { useState, useEffect } from "react";
import ReportBar from "../../components/ReportBar/ReportBar";
import Complaint from "../../components/complaint/Complaint";
import { Grid } from "@material-ui/core";
import api from "../../api";

function HomePageAdmin() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get.allComplaints();
        // console.table("All complaints", response.data.result);
        setComplaints(response.data.result);
      } catch (error) {
        console.error("Error at home page", error.message);
      }
    })();
  }, []);

  return (
    <div>
      <ReportBar />
      <Grid container direction="row" justify="center" alignItems="center">
        {complaints.map((val, key) => {
          if (val.status === "open") {
            return (
              <Complaint
                key={val._id}
                title={val.title}
                desc={val.content}
                dept={"RDA"}
                date={`${new Date(val.createdAt).getDate()}/${
                  new Date(val.createdAt).getMonth() + 1
                }/${new Date(val.createdAt).getFullYear()}`}
                status={val.status}
                type={val.status}
                imageUrl={val.media}
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

export default HomePageAdmin;
