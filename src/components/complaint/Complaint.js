import React, { useState, useEffect, useContext } from "react";
import { Card, CardContent, Button, Typography } from "@material-ui/core";
import { ArrowDropUp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "../alertBox/Alert";
import bicyleImg from "./Bicycle.png";
import api from "../../api";
import { GlobalContext } from "../../context";
import { COLOR } from "../../theme/Color";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "20px",
    width: "100%",
    padding: "0",
    backgroundColor: "#F5EBEB",
  },
  content: {
    display: "flex",
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
  complaintIdText: {
    fontSize: "18px",
    marginBottom: 5,
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
    display: "flex",
    paddingLeft: "11%",
    marginBottom: "0",
  },
  btn: {
    marginBottom: 10,
    height: 30,
    backgroundColor: COLOR.navCol,
  },
}));

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
  category,
  reason = null,
  onUpdate = null,
}) => {
  const classes = useStyles();
  const { userState } = useContext(GlobalContext);
  const [complaintType, setComplaintType] = useState(status); // render button according to the status
  const [showLess, setShowLess] = useState(true);
  const [Open, setOpen] = useState(false);

  useEffect(() => {
    setComplaintType(status);
  }, [status]);

  const handleOpenAlert = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleCloseAlert = () => {
    setOpen(false);
  };

  const handleConfirmAlert = async () => {
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
      alert("Error at complaint mark done", error.response ?? error.message);
    } finally {
      handleCloseAlert();
    }
  };

  const statusColor = () => {
    switch (status) {
      case "accepted":
        return (
          <Typography className={classes.caption}>
            Status:{" "}
            <span style={{ color: "#678d58" }}>{status.toUpperCase()}</span>
          </Typography>
        );
      case "processing":
        return (
          <Typography className={classes.caption}>
            Status:{" "}
            <span style={{ color: "#0077b6" }}>{status.toUpperCase()}</span>
          </Typography>
        );
      case "rejected":
        return (
          <Typography className={classes.caption}>
            Status: <span style={{ color: "red" }}>{status.toUpperCase()}</span>
          </Typography>
        );

      default:
        return (
          <Typography className={classes.caption}>
            Status:{" "}
            <span style={{ color: "#7d8597" }}>{status.toUpperCase()}</span>
          </Typography>
        );
    }
  };

  const rejectComment = () => {
    if (reason != null) {
      return (
        <Typography className={classes.caption}>
          {"Reject Comment: "}
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
            Close Complaint
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

  return (
    <div>
      <Card className={classes.container}>
        <CardContent className={classes.content}>
          <CardContent className={classes.userPref}>
            {/* <Button>User</Button> */}
            <CardContent className={classes.upvotes}>
              <ArrowDropUp fontSize="large" />
              <Typography>{votes.length ?? 0}</Typography>
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
            <Typography className={[classes.caption, classes.complaintIdText]}>
              {`T-${id.toString().toUpperCase()}`}
            </Typography>
            <Typography
              className={classes.caption}
            >{`Complainer: ${owner.firstName} ${owner.lastName} (${owner.contact})`}</Typography>
            <Typography className={classes.caption}>
              {`Category: ${category.title}`}
            </Typography>
            <Typography className={classes.caption}>
              {"Authority: "}
              <span className={classes.dept}>{authority.authorityName}</span>
            </Typography>
            {statusColor()}
            <Typography className={classes.caption}>
              {`Landmark: ${landmark}`}
            </Typography>
            <Typography
              className={classes.caption}
            >{`Address: ${location.line}`}</Typography>
            <Typography
              className={classes.caption}
            >{`City: ${location.city.toUpperCase()}`}</Typography>
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
