import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 16,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 0, 0),
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center"
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%"
  },
  btn: {
    borderTop: "1px solid #D9D9D9",
    flex: 1,
    margin: "20px 0 0",
    padding: "20px 0"
  }
}));

export default function SlideshowModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    props.clearSelectedImages();
    setOpen(false);
  };

  return (
    <div>
      <p className="slideshow-nav-btn" onClick={handleOpen}>
        Add to Slideshow
      </p>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">
            Add {props.images} photos to the slideshow?
          </h2>
          <img src="/image-stacked_02.png" width="180" />
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          <div className={classes.btnContainer}>
            <p
              className={classes.btn}
              onClick={handleAccept}
              style={{ borderRight: "1px solid #D9D9D9" }}
            >
              Accept
            </p>
            <p className={classes.btn} onClick={handleClose}>
              Cancel
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
