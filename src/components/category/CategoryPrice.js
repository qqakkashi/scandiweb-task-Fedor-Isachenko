import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrency } from "../../store/cartSlice";
import { GET_PRODUCTS_PRICE } from "../../queries/queries";
import { client } from "../..";
import withRouter from "../withRouter";

const mapStateToProps = (state) => ({
  currentCurrency: state.currency.currency,
});

export class CategoryPrice extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  async fetchQuery() {
    const result = await client.query({
      query: GET_PRODUCTS_PRICE,
      variables: {
        category: this.props.router?.location?.pathname?.slice(1),
      },
    });
    this.setState({
      products: result.data.category.products,
    });
  }
  componentDidMount() {
    this.fetchQuery();
  }
  componentDidUpdate(prevProps) {
    if (this.props.currency !== prevProps.currency) {
      this.setState({ currency: this.props?.currency });
    }
  }
  render() {
    console.log(this.props.prices);
    const currentAmount = this.props.prices.reduce(
      (currentAmount, { currency, amount }) => {
        if (currency?.symbol === this.props.currentCurrency) {
          currentAmount = amount;
        }
        return currentAmount;
      },
      ""
    );
    console.log(currentAmount);
    return (
      <p>
        {this.props.currentCurrency}
        {currentAmount}
      </p>
    );
  }
}

export default connect(mapStateToProps, { setCurrency })(
  withRouter(CategoryPrice)
);
