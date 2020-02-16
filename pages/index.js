import React, { Component } from "react";
import axios from "axios";
import Nav from "../components/nav";
import Button from "@material-ui/core/Button";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  render() {
    const instance = axios.create({
      baseURL: "http://10.3.19.74:8080/ccapi/",
      timeout: 1000
    });

    instance
      .get("ver100/contents/sd/100CANON/")
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => {
        console.warn(error);
      });

    return (
      <div>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

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
