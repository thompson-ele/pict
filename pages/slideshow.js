import React, { Component } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import SlideshowModal from "../components/SlideshowModal";
import theme from "../src/theme";
import { getAllImages } from "../src/api";

class Slideshow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Kitten_in_Rizal_Park%2C_Manila.jpg/1200px-Kitten_in_Rizal_Park%2C_Manila.jpg",
        "https://cdn.mos.cms.futurecdn.net/vChK6pTy3vN3KbYZ7UU7k3-320-80.jpg",
        "https://www.aspca.org/sites/default/files/blog_foster-myth_062718_main.jpg",
        "https://res.cloudinary.com/sagacity/image/upload/c_crop,h_1001,w_1500,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/Kitten_murder_Jeff_Merkley_2_copy_hdpoxd.jpg",
        "https://coleandmarmalade.com/wp-content/uploads/2020/01/Canva-Cute-American-cat-Kitten-scaled.jpg"
      ],
      activeImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Kitten_in_Rizal_Park%2C_Manila.jpg/1200px-Kitten_in_Rizal_Park%2C_Manila.jpg"
      ],
      // allImages: [],
      // activeImages: [],
      selectedImages: []
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

  clearSelectedImages = () => {
    this.setState(() => {
      return { selectedImages: [] };
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

  toggleActiveImg = image => {
    if (this.state.selectedImages.includes(image)) {
      const updatedSelectedImages = this.state.selectedImages;
      updatedSelectedImages.splice(this.state.selectedImages.indexOf(image), 1);
      // remove from the array
      this.setState(() => {
        return {
          selectedImages: updatedSelectedImages
        };
      });
    } else {
      // add to the array
      this.setState((state, props) => {
        return { selectedImages: [...state.selectedImages, image] };
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
          <div className="slideshow-nav">
            <h1>Event Slideshow</h1>
            {!this.state.selectedImages || !this.state.selectedImages.length ? (
              <p className="slideshow-nav-btn">Select</p>
            ) : (
              <SlideshowModal
                images={this.state.selectedImages.length}
                clearSelectedImages={this.clearSelectedImages}
              />
            )}
          </div>

          <div className="slideshow-img-grid">
            {this.state.activeImages.length > 0
              ? this.state.activeImages.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className="slideshow-img-thumb"
                      onClick={() => this.toggleActiveImg(image)}
                    >
                      <div
                        className={`slideshow-img-thumb-wrapper ${
                          this.state.selectedImages.includes(image)
                            ? "active"
                            : ""
                        }`}
                        width="170"
                        height="170"
                      >
                        <img
                          src={image}
                          width="170"
                          onLoad={() => this.loadNextImg(index)}
                        />
                      </div>
                    </div>
                  );
                })
              : "You have no pictures"}
          </div>
        </main>

        <style jsx>{`
          .slideshow-nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          h1 {
            font-family: "Roboto";
            font-size: 32px;
          }
          .slideshow-img-grid {
            display: flex;
            flex-wrap: wrap;
          }
          .slideshow-img-thumb {
            background-color: #f4f4f4;
            flex: 0 0 170px;
            margin-right: 20px;
            margin-bottom: 20px;
          }
          .slideshow-img-thumb-wrapper {
            width: 170px;
            height: 170px;
            overflow: hidden;
            position: relative;
          }
          .slideshow-img-thumb img {
            height: 100%;
            width: auto;
          }
          .slideshow-img-thumb .active::before {
            content: "";
            position: absolute;
            background-color: rgba(0, 0, 0, 0.5);
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
}

export default Slideshow;
