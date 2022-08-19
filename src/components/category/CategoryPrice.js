import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrency } from "../../store/cartSlice";

const mapStateToProps = (state) => ({
  currentCurrency: state.cart.currency,
});

class CategoryPrice extends Component {
  render() {
    const currentAmount = this.props.prices.reduce(
      (currentAmount, { currency, amount }) => {
        if (currency?.symbol === this.props.currentCurrency) {
          currentAmount = amount;
        }
        return currentAmount;
      },
      ""
    );
    return (
      <p style={{ opacity: `${!this.props.inStock ? "0.5" : "1"}` }}>
        {this.props.currentCurrency}
        {currentAmount}
      </p>
    );
  }
}

export default connect(mapStateToProps, { setCurrency })(CategoryPrice);
