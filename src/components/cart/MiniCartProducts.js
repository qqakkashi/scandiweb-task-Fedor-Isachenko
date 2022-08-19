import React, { Component } from "react";
import minus_square from "../../images/minus-square.svg";
import plus_square from "../../images/plus-square.svg";
import { connect } from "react-redux";
import { addProductToCart } from "../../store/cartSlice";

const mapStateToProps = (state) => ({
  currentCurrency: state.cart.currency,
  products: state.cart.products,
});

export class MiniCartProducts extends Component {
  constructor(props) {
    super(props);
    this.state = { numberOfUnits: 0 };
  }
  currentAmount(prices, count) {
    return prices?.reduce((currentAmount, { currency, amount }) => {
      if (currency?.symbol === this.props.currentCurrency) {
        currentAmount = amount * count;
      }
      return currentAmount;
    }, "");
  }
  componentDidMount() {
    this.setState({ numberOfUnits: this.props?.numberOfUnits });
  }
  changeNumberOfUnits(action) {
    action === "+"
      ? this.setState({ numberOfUnits: this.state.numberOfUnits + 1 })
      : this.setState({ numberOfUnits: this.state.numberOfUnits - 1 });
    const currentProduct = [...this.props.products];
    if (this.props.allAttributes.length === this.props.attributes.length) {
      if (currentProduct.some((product) => product.id === this.props?.id)) {
        currentProduct.forEach((product, index) => {
          if (
            JSON.stringify(product.attributes) ===
            JSON.stringify(this.props.attributes)
          ) {
            console.log(product.attributes, this.props.attributes);
            action === "+"
              ? currentProduct.splice(index, 1, {
                  ...currentProduct[index],
                  numberOfUnits: currentProduct[index].numberOfUnits + 1,
                })
              : currentProduct.splice(index, 1, {
                  ...currentProduct[index],
                  numberOfUnits: currentProduct[index].numberOfUnits - 1,
                });
          }
        });
      }
    }
    this.props.addProductToCart(currentProduct);
  }
  render() {
    return (
      this.props?.numberOfUnits > 0 && (
        <div className="mini-cart-info">
          <div className="mini-cart-attributes">
            <p>{this.props?.brand}</p>
            <p>{this.props?.name}</p>
            <h4>
              {this.props?.currentCurrency}
              {this.currentAmount(this.props?.prices, this.state.numberOfUnits)}
            </h4>
            <div>
              {this.props?.allAttributes?.map((attribute, index) => {
                return (
                  <div key={Math.random() * index}>
                    <p>{attribute.name}:</p>
                    {attribute.items.map((item) => {
                      return item.value.includes("#") ? (
                        item.value.includes("#FFFFFF") ? (
                          <button
                            key={Math.random()}
                            style={
                              this.props?.attributes[index].name ===
                                attribute.name &&
                              this.props?.attributes[index].value === item.value
                                ? {
                                    backgroundColor: `${item.value}`,
                                    border: 0,
                                    width: 16,
                                    height: 16,
                                    outline: "2px solid #5ECE7B",
                                    outlineOffset: "2px",
                                  }
                                : {
                                    backgroundColor: `${item.value}`,
                                    border: 0,
                                    outline: "1px solid #1D1F22",
                                    width: 16,
                                    height: 16,
                                  }
                            }
                          ></button>
                        ) : (
                          <button
                            key={Math.random()}
                            style={
                              this.props?.attributes[index].name ===
                                attribute.name &&
                              this.props?.attributes[index].value === item.value
                                ? {
                                    backgroundColor: `${item.value}`,
                                    border: 0,
                                    width: 16,
                                    height: 16,
                                    outline: "2px solid #5ECE7B",
                                    outlineOffset: "2px",
                                  }
                                : {
                                    backgroundColor: `${item.value}`,
                                    border: 0,
                                    width: 16,
                                    height: 16,
                                  }
                            }
                          ></button>
                        )
                      ) : (
                        <button
                          key={Math.random()}
                          style={
                            this.props?.attributes[index].name ===
                              attribute.name &&
                            this.props?.attributes[index].value === item.value
                              ? {
                                  backgroundColor: "#1D1F22",
                                  color: "#FFFFFF",
                                  outline: "1px solid #1D1F22",
                                  border: 0,
                                  width: `${
                                    item.value.length >= 4 ? "40px" : "24px"
                                  }`,
                                  height: 24,
                                  padding: 0,
                                  fontFamily: "Source Sans Pro",
                                }
                              : {
                                  backgroundColor: "#ffffff",
                                  outline: "1px solid #1D1F22",
                                  border: 0,
                                  width: `${
                                    item.value.length >= 4 ? "40px" : "24px"
                                  }`,
                                  height: 24,
                                  padding: 0,
                                  fontFamily: "Source Sans Pro",
                                }
                          }
                        >
                          {item.value}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mini-cart-counter-gallery">
            <div className="counter">
              <img
                src={plus_square}
                alt={plus_square}
                onClick={() => this.changeNumberOfUnits("+")}
              />
              {this.state.numberOfUnits}
              <img
                src={minus_square}
                alt={minus_square}
                onClick={() => this.changeNumberOfUnits("-")}
              />
            </div>
            <img
              alt={this.props?.gallery[0]}
              className="gallery"
              src={this.props?.gallery[0]}
            ></img>
          </div>
        </div>
      )
    );
  }
}

export default connect(mapStateToProps, { addProductToCart })(MiniCartProducts);
