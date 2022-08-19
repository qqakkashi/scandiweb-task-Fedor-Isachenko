import React, { Component } from "react";
import arrow_left from "../../images/arrow-left.svg";

export class GalleryCart extends Component {
  constructor(props) {
    super(props);
    this.state = { galleryIndex: 0 };
  }
  setGallery(index, length, action) {
    console.log(index, length);
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
            <img
              src={arrow_left}
              alt={arrow_left}
              onClick={() =>
                this.setGallery(
                  this.state.galleryIndex,
                  this.props?.gallery.length,
                  "left"
                )
              }
            ></img>
            <img
              src={arrow_left}
              alt={arrow_left}
              style={{ transform: `rotate(180deg)` }}
              onClick={() =>
                this.setGallery(
                  this.state.galleryIndex,
                  this.props?.gallery.length,
                  "rigth"
                )
              }
            ></img>
          </div>
        )}
      </div>
    );
  }
}

export default GalleryCart;
