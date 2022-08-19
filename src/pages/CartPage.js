import React, { Component } from "react";
import { connect } from "react-redux";
import QuantityCart from "../components/cart/QuantityCart";
import "../styles/cart.css";
import GalleryCart from "../components/cart/GalleryCart";

const mapStateToProps = (state) => ({
  currentCurrency: state.cart.currency,
  products: state.cart.products,
});

export class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = { galleryIndex: 0 };
  }
  currentAmount(prices, count) {
    return prices?.reduce((currentAmount, { currency, amount }) => {
      if (currency?.symbol === this.props.currentCurrency) {
        currentAmount = amount * count;
      }
      return currentAmount;
    }, "");
  }

  render() {
    const totalAmount = this.props?.products.reduce((total, product) => {
      product.prices.forEach(({ currency, amount }) => {
        if (currency.symbol === this.props.currentCurrency) {
          total = total + amount * product.numberOfUnits;
        }
      });
      return total;
    }, 0);
    const countOfItems = this.props?.products.reduce((total, product) => {
      return total + product.numberOfUnits;
    }, 0);
    return (
      <main>
        <h1>Cart</h1>
        <div className="cart">
          {this.props?.products.map((product) => {
            return (
              product.numberOfUnits >= 1 && (
                <div key={Math.random()}>
                  <div className="line"></div>
                  <div className="product-info-attributes">
                    <div className="product-info">
                      <h2>{product.brand}</h2>
                      <h3>{product.name}</h3>
                      <p>
                        {this.props?.currentCurrency}
                        {this.currentAmount(
                          product.prices,
                          product.numberOfUnits
                        ).toFixed(2)}
                      </p>
                      <div className="product-attributes">
                        {product.allAttributes?.map((attribute, index) => {
                          return (
                            <div
                              key={Math.random()}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <p>{attribute.name}:</p>
                              <div>
                                {attribute.items.map((item) => {
                                  return item.value.includes("#") ? (
                                    item.value.includes("#FFFFFF") ? (
                                      <button
                                        key={Math.random()}
                                        style={
                                          product.attributes[index].name ===
                                            attribute.name &&
                                          product.attributes[index].value ===
                                            item.value
                                            ? {
                                                backgroundColor: `${item.value}`,
                                                border: 0,
                                                width: 32,
                                                height: 32,
                                                outline: "2px solid #5ECE7B",
                                                outlineOffset: "2px",
                                              }
                                            : {
                                                backgroundColor: `${item.value}`,
                                                border: 0,
                                                outline: "1px solid #1D1F22",
                                                width: 32,
                                                height: 32,
                                              }
                                        }
                                      ></button>
                                    ) : (
                                      <button
                                        key={Math.random()}
                                        style={
                                          product.attributes[index].name ===
                                            attribute.name &&
                                          product.attributes[index].value ===
                                            item.value
                                            ? {
                                                backgroundColor: `${item.value}`,
                                                border: 0,
                                                width: 32,
                                                height: 32,
                                                outline: "2px solid #5ECE7B",
                                                outlineOffset: "2px",
                                                marginRight: 12,
                                              }
                                            : {
                                                backgroundColor: `${item.value}`,
                                                border: 0,
                                                width: 32,
                                                height: 32,
                                                marginRight: 12,
                                              }
                                        }
                                      ></button>
                                    )
                                  ) : (
                                    <button
                                      key={Math.random()}
                                      style={
                                        product.attributes[index].name ===
                                          attribute.name &&
                                        product.attributes[index].value ===
                                          item.value
                                          ? {
                                              backgroundColor: "#1D1F22",
                                              color: "#FFFFFF",
                                              outline: "1px solid #1D1F22",
                                              border: 0,
                                              width: 65,
                                              height: 45,
                                              padding: 0,
                                              marginRight: 8,
                                              fontFamily: "Source Sans Pro",
                                            }
                                          : {
                                              backgroundColor: "#ffffff",
                                              outline: "1px solid #1D1F22",
                                              border: 0,
                                              width: 65,
                                              height: 45,
                                              padding: 0,
                                              marginRight: 8,
                                              fontFamily: "Source Sans Pro",
                                            }
                                      }
                                    >
                                      {item.value}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="product-quantity-gallery">
                      <QuantityCart
                        numberOfUnits={product.numberOfUnits}
                        allAttributes={product.allAttributes}
                        attributes={product.attributes}
                        id={product.id}
                      />
                      <GalleryCart gallery={product.gallery} id={product.id} />
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="order">
          <div className="line"></div>

          <p>
            Tax 21%:{" "}
            <span>
              {this.props.currentCurrency}
              {(totalAmount * 0.21).toFixed(2)}
            </span>
          </p>
          <p>
            Quantity: <span>{countOfItems}</span>
          </p>
          <p>
            Total:{" "}
            <span>
              {this.props.currentCurrency}
              {totalAmount.toFixed(2)}
            </span>
          </p>
          <button>order</button>
        </div>
      </main>
    );
  }
}

export default connect(mapStateToProps)(CartPage);
