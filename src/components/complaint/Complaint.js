import React, { useState, useEffect, useContext } from "react";
import { Card, CardContent, Button, Typography } from "@material-ui/core";
import { ArrowDropUp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "../alertBox/Alert";
import bicyleImg from "./Bicycle.png";
// import { COLOR } from "../../theme/Color";
import api from "../../api";
import { GlobalContext } from "../../context";

const Complaint = ({
  id,
  status,
  votes,
  owner,
  title,
  content,
  location,
  landmark,
  media,
  comments,
  date,
  authority,
  reason = null,
  onUpdate = null,
}) => {
  const { userState } = useContext(GlobalContext);
  const [complaintType, setComplaintType] = useState(status); // render button according to the status
  const [showLess, setShowLess] = useState(true);
  const [Open, setOpen] = useState(false);

  useEffect(() => {
    setComplaintType(status);
  }, [status]);

  console.log(media);

  const handleOpenAlert = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleCloseAlert = () => {
    setOpen(false);
  };

  const handleConfirmAlert = async () => {
    console.log("Confirmed job", id);
    try {
      const body = {
        userId: userState.data.id,
        complaintId: id,
        reason: "none",
        complaintState: "closed",
      };
      const response = await api.patch.complaintStatusAsDone(body);
      console.dir(response.data.result);
      onUpdate();
    } catch (error) {
      console.log(
        "Error at complaint mark done",
        error.response ?? error.message
      );
    } finally {
      handleCloseAlert();
    }
  };

  const statusColor = () => {
    switch (status) {
      case "accepted":
        return (
          <Typography className={classes.caption}>
            Status: <span style={{ color: "#678d58" }}>{status}</span>
          </Typography>
        );
      case "processing":
        return (
          <Typography className={classes.caption}>
            Status: <span style={{ color: "#0077b6" }}>{status}</span>
          </Typography>
        );
      case "rejected":
        return (
          <Typography className={classes.caption}>
            Status: <span style={{ color: "red" }}>{status}</span>
          </Typography>
        );

      default:
        return (
          <Typography className={classes.caption}>
            Status: <span style={{ color: "#7d8597" }}>{status}</span>
          </Typography>
        );
    }
  };

  const rejectComment = () => {
    if (reason != null) {
      return (
        <Typography className={classes.caption}>
          Reject Comment:{" "}
          <span style={{ fontWeight: "normal" }}> {reason}</span>
        </Typography>
      );
    } else {
      return "";
    }
  };

  const renderButtons = () => {
    if (complaintType === "processing")
      return (
        <React.Fragment>
          <Button
            disableRipple
            variant="contained"
            color="secondary"
            className={classes.btn}
            onClick={handleOpenAlert}
          >
            Confirm Job Done
          </Button>
          <Alert
            open={Open}
            onClose={handleCloseAlert}
            onConfirm={handleConfirmAlert}
            Type={status}
            title={title}
          />
        </React.Fragment>
      );
  };

  const classes = useStyles();
  return (
    <div>
      <Card className={classes.container}>
        <CardContent className={classes.content}>
          <CardContent className={classes.userPref}>
            {/* <Button>User</Button> */}
            <CardContent className={classes.upvotes}>
              <ArrowDropUp fontSize="large" />
              <Typography>11</Typography>
            </CardContent>
          </CardContent>

          <CardContent className={classes.details}>
            <Typography variant="h4" className={classes.heading}>
              {title}
            </Typography>
            <img className={classes.media} src={bicyleImg} alt="" />
            {/* <img
              className={classes.media}
              src={`https://tell-lk/.netlify/functions/api/file/${media}`}
              alt="Complaint"
            /> */}
            <Typography>
              {showLess ? `${content.slice(0, 70)}...` : content}
            </Typography>
            <Typography
              className={classes.desc}
              style={{}}
              onClick={() => setShowLess(!showLess)}
            >
              View {showLess ? "More" : "Less"}
            </Typography>
            <Typography className={classes.caption}>
              Complainer:{" "}
              <span className={classes.dept}>
                {" "}
                {`${owner.firstName} ${owner.lastName}`}
              </span>
            </Typography>
            <Typography className={classes.caption}>
              Authority: <span className={classes.dept}> {authority}</span>
            </Typography>
            {statusColor()}
            <Typography className={classes.caption}>Date: {date}</Typography>
            {rejectComment()}
          </CardContent>

          <CardContent className={classes.medDet}></CardContent>
        </CardContent>

        <CardContent className={classes.check}>{renderButtons()}</CardContent>
      </Card>
    </div>
  );
};

export default Complaint;

// styles
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "20px",
    width: "100%",
    // height: "100%",
    padding: "0",
    backgroundColor: "#F5EBEB",
    // minWidth: "490px",
  },
  content: {
    display: "flex",
    // height: "100%",
    margin: "0",
    padding: "0",
  },
  userPref: {
    display: "flex",
    flexDirection: "column",
    width: "10%",
  },
  upvotes: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1.5px",
  },
  details: {
    width: "90%",
  },
  heading: {
    marginBottom: "10px",
  },
  caption: {
    fontSize: "15px",
    fontWeight: "bold",
  },
  desc: {
    cursor: "pointer",
    color: "blue",
    marginBottom: "10px",
  },
  dept: {
    textDecoration: "underline",
  },

  media: {
    minHeight: "160px",
    maxHeight: "300px",
    maxWidth: "300px",
    minWidth: "160px",
    marginBottom: "10px",
  },
  check: {
    width: "100%",
    // height: "40px",
    // marginLeft: "110px",
    display: "flex",
    paddingLeft: "11%",
    marginBottom: "0",
  },
  btn: {
    marginBottom: 10,
    height: 30,
  },
}));
