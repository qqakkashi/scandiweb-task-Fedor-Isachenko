import React, { Component } from "react";
import empty_cart from "../../images/empty-cart.svg";
import { connect } from "react-redux";

import MiniCartProducts from "./MiniCartProducts";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => ({
  currentCurrency: state.cart.currency,
  products: state.cart.products,
});

export class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      miniCartMenuIsOpen: false,
    };
  }
  miniCartMenu() {
    this.setState({ miniCartMenuIsOpen: !this.state.miniCartMenuIsOpen });
  }
  componentDidMount() {}
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
      <div className="header-cart">
        <div className="mini-cart-items-count">
          <div className="count-icon" onClick={() => this.miniCartMenu()}>
            <p>{countOfItems}</p>
          </div>

          <img
            style={{ marginLeft: "20px" }}
            src={empty_cart}
            alt="empty-cart"
            onClick={() => this.miniCartMenu()}
          ></img>
        </div>

        {this.state.miniCartMenuIsOpen && (
          <>
            <div className="mini-cart">
              <h3>My Bag, {countOfItems} items</h3>

              <div className="mini-cart-items">
                {this.props?.products.map(
                  (
                    {
                      id,
                      name,
                      brand,
                      prices,
                      numberOfUnits,
                      allAttributes,
                      attributes,
                      gallery,
                    },
                    index
                  ) => {
                    return (
                      <MiniCartProducts
                        id={id}
                        name={name}
                        brand={brand}
                        prices={prices}
                        numberOfUnits={numberOfUnits}
                        allAttributes={allAttributes}
                        attributes={attributes}
                        gallery={gallery}
                        index={index}
                        key={Math.random()}
                      />
                    );
                  }
                )}
              </div>

              <h4>
                Total:
                <span>
                  {this.props?.currentCurrency}
                  {totalAmount.toFixed(2)}
                </span>
              </h4>
              <div className="mini-cart-buttons">
                <Link to="cart">
                  <button className="bag" onClick={() => this.miniCartMenu()}>
                    View bag
                  </button>
                </Link>
                <button className="check">CHECK OUT</button>
              </div>
            </div>
            <div
              className="mini-cart-background"
              onClick={() => this.miniCartMenu()}
            ></div>
          </>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(MiniCart);
