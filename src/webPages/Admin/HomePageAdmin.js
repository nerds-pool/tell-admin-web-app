import React, { useState, useEffect, useContext } from "react";
import ReportBar from "../../components/ReportBar/ReportBar";
import Complaint from "../../components/complaint/Complaint";
import { Grid } from "@material-ui/core";
import api from "../../api";
import { GlobalContext } from "../../context";

function HomePageAdmin() {
  const { userState } = useContext(GlobalContext);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const userId = userState.data.id;
        const response = await api.get.allPosts(userId);
        // console.table("All complaints", response.data.result);
        setComplaints(response.data.result);
      } catch (error) {
        console.error("Error at home page", error.message);
      }
    })();
  }, [userState]);

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
