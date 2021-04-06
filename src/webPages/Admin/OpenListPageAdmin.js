import React from 'react'
import ReportBar from "../../components/ReportBar/ReportBar";
import Complaint from "../../components/complaint/Complaint";
import { ComplaintData } from "../../FetchData/ComplaintData";

import { Grid } from "@material-ui/core";

function OpenListPageAdmin() {
    return (
        <div>
            <ReportBar/>
            <Grid container direction="row" justify="center" alignItems="center">
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
    )
}

export default OpenListPageAdmin
