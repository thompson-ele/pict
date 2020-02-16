import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Button from "@material-ui/core/Button";
import { getLiveFeed, startLiveFeed } from "../src/api";

function hexToBase64(str) {
  return btoa(
    String.fromCharCode.apply(
      null,
      str
        .replace(/\r|\n/g, "")
        .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
        .replace(/ +$/, "")
        .split(" ")
    )
  );
}
class Live extends React.Component {
  state = {
    currentImage:
      "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
  };
  componentDidMount() {
    startLiveFeed().then(() => {
      getLiveFeed().then(({ data }) => {
        //create image from binary
        var d = "data:image/jpeg;base64," + hexToBase64(data);

        this.setState({
          currentImage: d
        });
      });
    });
  }
  render() {
    return (
      <div>
        <Head>
          <title>Live</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        image below
        <div>
          <img src={this.state.currentImage} />
        </div>
        {this.state.currentImage}
        image above
      </div>
    );
  }
}

export default Live;
