import React from "react";
import { capturePhoto } from "../src/api";

class Pose extends React.Component {
  state = {};

  tracker = null;

  componentDidMount() {
    this.tracker = new window.tracking.ObjectTracker("face");
    this.tracker.setInitialScale(4);
    this.tracker.setStepSize(2);
    this.tracker.setEdgesDensity(0.1);

    window.tracking.track(this.refs.cameraOutput, this.tracker, {
      camera: true
    });

    let xPos = 0;
    let xStartRange = 0;
    let xEndRange = 0;
    let countdown = 0;
    let readyToCapture = true;

    this.tracker.on("track", event => {
      let context = this.refs.canvas.getContext("2d");
      context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
      event.data.forEach(function(rect) {
        xPos = rect.x;
        if (xPos > xStartRange && xPos < xEndRange && countdown >= 0) {
          console.log(countdown);
          countdown--;
          if (countdown == 0 && readyToCapture) {
            console.log("capture");
            readyToCapture = false;
            capturePhoto();
          }
        } else {
          countdown = 10;
          readyToCapture = true;
          xStartRange = xPos - 10;
          xEndRange = xPos + 10;
          console.log("reset");
        }

        context.strokeStyle = "#a64ceb";
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = "11px Helvetica";
        context.fillStyle = "#fff";
        context.fillText(
          "x: " + rect.x + "px",
          rect.x + rect.width + 5,
          rect.y + 11
        );
        context.fillText(
          "y: " + rect.y + "px",
          rect.x + rect.width + 5,
          rect.y + 22
        );
      });
    });
  }

  componentWillUnmount() {
    this.tracker.removeAllListeners();
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="video-wrap">
            <video
              ref="cameraOutput"
              width="640"
              height="480"
              preload
              autoPlay
              loop
              muted
            ></video>
          </div>
          <div className="canvas-wrap">
            <canvas ref="canvas" width="640" height="480"></canvas>
          </div>
        </div>
        <style jsx>{`
          .container {
            height: 480px;
            position: relative;
            margin-top: 13vh;
          }
          .video-wrap {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
            display: flex;
            justify-content: center;
          }
          .canvas-wrap {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 2;
            display: flex;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }
}

export default Pose;
