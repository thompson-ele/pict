import React, { Component } from "react";
import axios from "axios";
import Head from "next/head";
import Nav from "../components/nav";
import Button from "@material-ui/core/Button";
import { getAllImages } from "../src/api";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: null
    };
  }

  componentDidMount = () => {
    console.log("componentDidMount");
    getAllImages().then(response => {
      this.setState(() => {
        return { images: response };
      });
    });
  };

  loadImages = imgURLs => {};

  render() {
    return (
      <div>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {this.state.images !== null &&
          this.state.images.length > 0 &&
          this.state.images.map((image, index) => (
            <img src={image} key={index} alt={image} width="200" />
          ))}

        <Nav />
        <div className="hero">
          <Button variant="contained">Default</Button>
          <Button variant="contained" color="primary">
            Primary
          </Button>
          <Button variant="contained" color="secondary">
            Secondary
          </Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
          <Button variant="contained" color="primary" href="#contained-buttons">
            Link
          </Button>
          <h1 className="title">Welcome to Next.js!</h1>
          <p className="description">
            To get started, edit <code>pages/index.js</code> and save to reload.
          </p>
        </div>

        <style jsx>{`
          .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title,
          .description {
            text-align: center;
          }
          .row {
            max-width: 880px;
            margin: 80px auto 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .card {
            padding: 18px 18px 24px;
            width: 220px;
            text-align: left;
            text-decoration: none;
            color: #434343;
            border: 1px solid #9b9b9b;
          }
          .card:hover {
            border-color: #067df7;
          }
          .card h3 {
            margin: 0;
            color: #067df7;
            font-size: 18px;
          }
          .card p {
            margin: 0;
            padding: 12px 0 0;
            font-size: 13px;
            color: #333;
          }
        `}</style>
      </div>
    );
  }
}

// Home.getInitialProps = async function() {

// };
export default Home;
