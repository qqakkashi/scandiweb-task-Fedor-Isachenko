import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrency } from "../../store/cartSlice";
import { Text } from "./categoryprice.styled";

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
      <Text inStock={this.props?.inStock}>
        {this.props.currentCurrency}
        {currentAmount}
      </Text>
    );
  }
}

export default connect(mapStateToProps, { setCurrency })(CategoryPrice);
