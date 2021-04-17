import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { HelpOutline } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { COLOR } from "../../theme/Color";

const useStyles = makeStyles((theme) => ({
  alertContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
  },
  IconCon: {
    alignSelf: "center",
  },
  Icon: {
    color: COLOR.navCol,
    fontSize: "60px",
  },
  buttons: {
    justifyContent: "center",
    color: "white",
  },
  confirm: {
    backgroundColor: COLOR.navCol,
    color: "white",

    "&:hover": {
      backgroundColor: COLOR.navCol,
      color: "white",
    },
  },
  cancel: {
    backgroundColor: COLOR.redColour,
    color: "white",
    "&:hover": {
      backgroundColor: COLOR.redColour,
      color: "white",
    },
  },
}));

function Alert(props) {
  const classes = useStyles();
  const [AlertType, setAlertType] = useState(props.Type); // State for receiving Alert Type
  const [BtnType, setBtnType] = useState(props.btnType);

  useEffect(() => setBtnType(props.btnType), [props.btnType]);
  useEffect(() => setAlertType(props.Type), [props.Type]);

  const DisplayAlert = () => {
    if (AlertType === "open" && BtnType === "Confirm")
      return (
        // Click Accept
        <Dialog
          open={props.open}
          onClose={props.onClose}
          aria-labelledby="form-dialog-title"
          className={classes.dialogBox}
        >
          <DialogContent className={classes.alertContainer}>
            <DialogContent className={classes.IconCon}>
              <HelpOutline className={classes.Icon} />
            </DialogContent>
            <DialogTitle id="form-dialog-title">
              Confirm your request!
            </DialogTitle>
            <DialogContentText>{`Complaint: ${props.title}`}</DialogContentText>

            <DialogActions className={classes.buttons}>
              <Button
                fullWidth
                onClick={props.onClose}
                className={classes.confirm}
              >
                Confirm
              </Button>
              <Button
                fullWidth
                onClick={props.onClose}
                className={classes.cancel}
              >
                Cancel
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      );

    if (AlertType === "open" && BtnType === "Reject")
      return (
        // Click Accept
        <Dialog
          open={props.open}
          onClose={props.onClose}
          aria-labelledby="form-dialog-title"
          className={classes.dialogBox}
        >
          <DialogContent className={classes.alertContainer}>
            <DialogContent className={classes.IconCon}>
              <HelpOutline className={classes.Icon} />
            </DialogContent>
            <DialogTitle id="form-dialog-title">
              Confirm your request!
            </DialogTitle>
            <DialogContentText>{`Complaint: ${props.title}`}</DialogContentText>
            <DialogContent>
              <TextField
                id="outlined-multiline-static"
                label="Write the Reason to Reject Complaint"
                multiline
                rows={2}
                color="secondary"
                variant="outlined"
                required
              />
            </DialogContent>
            <DialogActions className={classes.buttons}>
              <Button
                fullWidth
                onClick={props.onClose}
                className={classes.confirm}
              >
                Confirm
              </Button>
              <Button
                fullWidth
                onClick={props.onClose}
                className={classes.cancel}
              >
                Cancel
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      );

    if (AlertType === "accepted")
      return (
        <Dialog
          open={props.open}
          onClose={props.onClose}
          aria-labelledby="form-dialog-title"
          className={classes.dialogBox}
        >
          <DialogContent className={classes.alertContainer}>
            <DialogContent className={classes.IconCon}>
              <HelpOutline className={classes.Icon} />
            </DialogContent>
            <DialogTitle id="form-dialog-title">
              Confirm your request!
            </DialogTitle>
            <DialogContentText>{`Complaint: ${props.title}`}</DialogContentText>

            <DialogActions className={classes.buttons}>
              <Button
                fullWidth
                onClick={props.onClose}
                className={classes.confirm}
              >
                Confirm
              </Button>
              <Button
                fullWidth
                onClick={props.onClose}
                className={classes.cancel}
              >
                Cancel
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      );

    if (AlertType === "processing")
      return (
        <Dialog
          open={props.open}
          onClose={props.onClose}
          aria-labelledby="form-dialog-title"
          className={classes.dialogBox}
        >
          <DialogContent className={classes.alertContainer}>
            <DialogContent className={classes.IconCon}>
              <HelpOutline className={classes.Icon} />
            </DialogContent>
            <DialogTitle id="form-dialog-title">
              Do you want to close this complaint?
            </DialogTitle>
            <DialogContentText>{`Complaint: ${props.title}`}</DialogContentText>

            <DialogActions className={classes.buttons}>
              <Button
                fullWidth
                onClick={props.onConfirm}
                className={classes.confirm}
              >
                Confirm
              </Button>
              <Button
                fullWidth
                onClick={props.onClose}
                className={classes.cancel}
              >
                Cancel
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      );
  };

  return <div className={classes.Alert}>{DisplayAlert()}</div>;
}

export default Alert;
