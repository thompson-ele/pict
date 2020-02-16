import React, { Component } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import theme from "../src/theme";
import { getAllImages } from "../src/api";

class Slideshow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allImages: [],
      activeImages: []
    };
  }

  componentDidMount = () => {
    getAllImages().then(response => {
      if (response) {
        this.setState(() => {
          return { allImages: response, activeImages: [response[0]] };
        });
      }
    });
  };

  loadNextImg = index => {
    if (index < this.state.allImages.length) {
      this.setState((state, props) => {
        return {
          activeImages: [...state.activeImages, state.allImages[index + 1]]
        };
      });
    }
  };

  render() {
    return (
      <div className="site-wrapper">
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Nav />

        <main>
          <h1>Event Slideshow</h1>
          {this.state.activeImages.length > 0
            ? this.state.activeImages.map((image, index) => {
                return (
                  <div className="slideshow-img-thumb">
                    <img
                      src={image}
                      key={index}
                      width="170"
                      onLoad={() => this.loadNextImg(index)}
                    />
                  </div>
                );
              })
            : "You have no pictures"}
        </main>

        <style jsx>{`
          h1 {
            font-family: "Roboto";
            font-size: 32px;
          }
          .slideshow-img-thumb {
            background-color: #f4f4f4;
            width: 170px;
            height: 170px;
            overflow: hidden;
          }
          .slideshow-img-thumb img {
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
}

export default Slideshow;
