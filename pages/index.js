import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Head from "next/head";
import Link from "next/link";
import Nav from "../components/nav";
import Typography from "@material-ui/core/Typography";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cardStyles = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 450,
      height: 450,
      marginRight: 20
    };
    const cardContainerStyles = {
      display: "flex",
      width: "100%",
      height: "100%",
      justifyContent: "space-around",
      alignItems: "center"
    };
    return (
      <div className="site-wrapper">
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Nav />

        <main style={{ marginTop: 0 }}>
          <div style={cardContainerStyles}>
            <Link href="/photobooth">
              <a style={{ textDecoration: "none" }}>
                <Card style={cardStyles}>
                  <CardContent
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column"
                    }}
                  >
                    <img
                      height="57.56"
                      src="/photobooth-icon.svg"
                      style={{ margin: "0 auto" }}
                    />
                    <Typography
                      style={{
                        fontFamily: "Bebas Neue",
                        fontSize: 38,
                        paddingBottom: 40
                      }}
                    >
                      Photo Booth
                    </Typography>
                  </CardContent>
                </Card>
              </a>
            </Link>

            <Link href="/slideshow">
              <a style={{ textDecoration: "none" }}>
                <Card style={cardStyles}>
                  <CardContent>
                    <img src="/slideshow-icon.svg" />
                    <Typography
                      style={{
                        fontFamily: "Bebas Neue",
                        fontSize: 38,
                        paddingBottom: 40
                      }}
                    >
                      Slideshow
                    </Typography>
                  </CardContent>
                </Card>
              </a>
            </Link>
          </div>
        </main>
      </div>
    );
  }
}

// Home.getInitialProps = async function() {

// };
export default Home;
