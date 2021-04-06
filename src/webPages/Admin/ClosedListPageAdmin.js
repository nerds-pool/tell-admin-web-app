import React from 'react'

import ReportBar from "../../components/ReportBar/ReportBar";
import Complaint from "../../components/complaint/Complaint";
import { ComplaintData } from "../../FetchData/ComplaintData";

import { Grid } from "@material-ui/core";

function ClosedListPageAdmin() {
    return (
        <div>
         <ReportBar/>  
         <Grid container direction="row" justify="center" alignItems="center">
        {ComplaintData.map((val, key) => {
          if (val.status === "Closed") {
            return (
              <Complaint
                key={key}
                title={val.title}
                desc={val.description}
                dept={val.department}
                date={val.date}
                status={val.status}
                type={val.status}
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

export default ClosedListPageAdmin
