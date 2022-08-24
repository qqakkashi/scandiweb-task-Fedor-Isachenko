import React, { Component } from "react";
import arrow_left from "../images/arrow-left.svg";
import { MiniImage } from "./gallerycart.styled";

export class GalleryCart extends Component {
  constructor(props) {
    super(props);
    this.state = { galleryIndex: 0 };
  }
  setGallery(index, length, action) {
    action === "rigth"
      ? index >= length - 1
        ? this.setState({ galleryIndex: 0 })
        : this.setState({ galleryIndex: index + 1 })
      : index <= 0
      ? this.setState({ galleryIndex: length - 1 })
      : this.setState({ galleryIndex: index - 1 });
  }
  render() {
    return (
      <div className="gallery">
        <img
          src={this.props?.gallery[this.state.galleryIndex]}
          alt={this.props?.id}
        ></img>
        {this.props?.gallery.length > 1 && (
          <div className="gallery-buttons">
            <MiniImage
              src={arrow_left}
              alt={arrow_left}
              rotate={"left"}
              onClick={() =>
                this.setGallery(
                  this.state.galleryIndex,
                  this.props?.gallery.length,
                  "left"
                )
              }
            ></MiniImage>
            <MiniImage
              src={arrow_left}
              alt={arrow_left}
              rotate={"rigth"}
              onClick={() =>
                this.setGallery(
                  this.state.galleryIndex,
                  this.props?.gallery.length,
                  "rigth"
                )
              }
            ></MiniImage>
          </div>
        )}
      </div>
    );
  }
}

export default GalleryCart;
