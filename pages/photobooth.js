import React from "react";
import { capturePhoto } from "../src/api";
class PhotoBooth extends React.Component {
  state = {
    transcript: "hello"
  };
  initSpeechRecognition = () => {
    const sr = new webkitSpeechRecognition();
    sr.continuous = true;
    sr.interimResults = true;
    sr.lang = "en-IN";
    sr.start();
    return sr;
  };
  checkCommand = ts => (commands, fn) => {
    commands.forEach(command => {
      if (ts.includes(command)) {
        fn();
      }
    });
  };
  startListening = () => {
    capturePhoto();
    const hasSpeechRecognition = "webkitSpeechRecognition" in window;
    if (hasSpeechRecognition) {
      const sr = this.initSpeechRecognition();
      let finalTranscripts = "";
      sr.onresult = ({ resultIndex, results }) => {
        let interimTranscripts = "";
        finalTranscripts = "";

        for (var i = resultIndex; i < results.length; i++) {
          const transcript = results[i][0].transcript.toLowerCase();
          const commands = this.checkCommand(transcript);
          if (results[i].isFinal) {
            commands(["1", "one", "what"], () => {
              alert("one photo");
            });
            commands(["2", "two", "too"], () => {
              alert("two photos");
            });
            commands(["3", "three"], () => {
              alert("three photos");
            });
            commands(["4", "four", "for"], () => {
              alert("four photo");
            });
            commands(
              [
                "cheese",
                "she's",
                "cheap",
                "chief",
                "cheats",
                "sheetz",
                "chase"
              ],
              () => {
                capturePhoto();
              }
            );
          } else {
            interimTranscripts += transcript;
          }
        }
        this.setState({
          transcript: finalTranscripts + interimTranscripts
        });
      };
      sr.onerror = function(event) {};
    }
  };
  render() {
    return (
      <div className="photo-booth">
        <button className="start-button" onClick={this.startListening}>
          Touch
          <br />
          To start
          <br />
          {/* {this.state.transcript} */}
        </button>

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
              50px + (300 - 50) * ((100vw - 300px) / (1600 - 300))
            );
            letter-spacing: 0.05em;
          }
        `}</style>
      </div>
    );
  }
}

export default PhotoBooth;
