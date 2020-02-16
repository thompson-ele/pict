import React from "react";
import { capturePhoto, getLastImage } from "../src/api";
import debounce from "lodash/debounce";

class PhotoBooth extends React.Component {
  state = {
    transcript: "hello",
    numPhotos: null,
    srStart: false,
    showDirections: false,
    readyToShoot: false,
    done: false,
    takenPhoto: ""
  };

  initSpeechRecognition = () => {
    const sr = new webkitSpeechRecognition();
    sr.continuous = true;
    sr.interimResults = true;
    sr.lang = "en-IN";
    sr.start();
    this.setState({
      srStart: true
    });
    return sr;
  };

  checkCommand = ts => (commands, fn) => {
    commands.forEach(command => {
      if (ts.includes(command)) {
        fn();
      }
    });
  };
  setPhotos = num => {
    if (this.state.numPhotos === null) {
      this.setState({
        numPhotos: num
      });
      setTimeout(() => {
        this.setState({ showDirections: true });
      }, 1000);
    }
  };
  checkCommands = () => {
    const commands = this.checkCommand(this.state.transcript);
    commands(["1", "one", "what"], () => {
      this.setPhotos(1);
    });
    commands(["2", "two", "too"], () => {
      this.setPhotos(2);
    });
    commands(["3", "three"], () => {
      this.setPhotos(3);
    });
    commands(["4", "four", "for", "or", "fart"], () => {
      this.setPhotos(4);
    });
    commands(
      [
        "cheese",
        "she's",
        "cheap",
        "chief",
        "cheats",
        "sheetz",
        "chase",
        "cease"
      ],
      async () => {
        if (this.state.numPhotos > 0) {
          this.setState(prevState => ({
            numPhotos: prevState.numPhotos - 1
          }));
        } else {
          this.setState({
            done: true
          });
        }

        await capturePhoto();
        const lastImage = await getLastImage();
        console.log(lastImage);
        this.setState({
          takenPhoto: lastImage
        });

        setTimeout(() => {
          this.setState({
            takenPhoto: null
          });
        }, 4000);
      }
    );
  };
  setToReady = () => {
    this.setState({ readyToShoot: true });
  };
  startListening = () => {
    const hasSpeechRecognition = "webkitSpeechRecognition" in window;
    if (hasSpeechRecognition) {
      const sr = this.initSpeechRecognition();

      const transcribe = ({ resultIndex, results }) => {
        let interimTranscripts = "";
        for (var i = resultIndex; i < results.length; i++) {
          if (!results[i].isFinal) {
            interimTranscripts += results[i][0].transcript.toLowerCase();
          }
        }
        console.log(interimTranscripts);
        this.setState({
          transcript: interimTranscripts
        });
        this.checkCommands();
      };

      sr.onresult = debounce(transcribe, 500);
      sr.onerror = function(event) {};
    }
  };

  render() {
    return (
      <div className="photo-booth">
        {!this.state.srStart && (
          <button className="start-button" onClick={this.startListening}>
            Touch
            <br />
            To start
          </button>
        )}
        {this.state.srStart && !this.state.showDirections && (
          <div className="num-photo">
            How many photos
            <br />
            do you want to take?
            <br />
            <div className="current-photo-num">{this.state.numPhotos}</div>
            <div className="photo-max">(Four photos max)</div>
          </div>
        )}
        {this.state.showDirections &&
          !this.state.takenPhoto &&
          !this.state.done && (
            <div className="directions">
              <div className="directions-title">Directions</div>
              1. Pose
              <br />
              2. Look at the Camera
              <br />
              3. Say "Cheese" to take a picture take here start:
              {/* <div>
              {!this.state.readyToShoot && (
                <button className="ready-button" onClick={this.setToReady}>
                  Ready
                </button>
              )}
            </div> */}
              <div className="photos-left">
                {this.state.numPhotos} photos left
              </div>
            </div>
          )}
        {this.state.takenPhoto && (
          <div className="imageDisplayed">
            {<img src={this.state.takenPhoto} />}
          </div>
        )}

        <style jsx>{`
          .photo-booth {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }
          .start-button {
            background: transparent;
            border: 0;
            width: 100%;
            height: 100%;
            font-size: calc(
              50px + (200 - 50) * ((100vw - 300px) / (1600 - 300))
            );
            letter-spacing: 0.05em;
            background: #eee;
            font-weight: bold;
          }
          .num-photo {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            flex-direction: column;
            font-weight: bold;
            font-size: calc(
              24px + (100 - 24) * ((100vw - 300px) / (1600 - 300))
            );
          }
          .photo-max,
          .photos-left {
            margin-top: 0.7em;
            color: #717171;
            font-size: calc(
              12px + (50 - 12) * ((100vw - 300px) / (1600 - 300))
            );
          }
          .current-photo-num {
            font-size: calc(
              50px + (200 - 50) * ((100vw - 300px) / (1600 - 300))
            );
          }

          .directions {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            font-size: calc(
              18px + (70 - 18) * ((100vw - 300px) / (1600 - 300))
            );
            padding: 10vw;
            line-height: 2em;
            text-align: left;
          }
          .directions-title {
            font-weight: bold;
            font-size: calc(
              24px + (100 - 24) * ((100vw - 300px) / (1600 - 300))
            );
          }
          .ready-button {
            background: #6200ee;
            color: #fff;
            border-radius: 5px;
            text-transform: uppercase;
            padding: 0.4em 2em;
            font-size: calc(
              12px + (40 - 12) * ((100vw - 300px) / (1600 - 300))
            );
          }
        `}</style>
      </div>
    );
  }
}

export default PhotoBooth;
