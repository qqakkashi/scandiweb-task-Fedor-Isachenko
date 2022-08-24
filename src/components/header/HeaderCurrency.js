import React, { Component } from "react";
import { client } from "../../index";
import { GET_CATEGOIES_AND_CURRENCIES } from "../../queries/queries";
import arrow_down from "../images/arrow-down.svg";
import { connect } from "react-redux";
import { setCurrency } from "../../store/cartSlice";
import { Arrow } from "./headercurrency.styled";

const mapStateToProps = (state) => ({
  currency: state.cart.currency,
});

class HeaderCurrency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      currenciesMenuIsOpen: false,
      location: "",
    };
  }

  componentDidMount() {
    this.fetchQuery();
  }

  changeCurrensy = (event) => {
    this.props.setCurrency(event.target.firstChild.data);
    this.setState({
      currenciesMenuIsOpen: !this.state.currenciesMenuIsOpen,
    });
  };

  async fetchQuery() {
    const result = await client.query({
      query: GET_CATEGOIES_AND_CURRENCIES,
    });

    this.setState({
      currencies: [...result.data.currencies],
    });
  }
  render() {
    return (
      <>
        <div
          className="currency-change"
          onClick={() =>
            this.setState({
              currenciesMenuIsOpen: !this.state.currenciesMenuIsOpen,
            })
          }
        >
          <p>{this.props?.currency}</p>
          <Arrow
            src={arrow_down}
            alt={this.state.currenciesMenuIsOpen ? "arrow up" : "arrow down"}
            open={this.state.currenciesMenuIsOpen}
          />
          {this.state.currenciesMenuIsOpen && (
            <>
              <div
                className="currency-menu-background"
                onClick={() =>
                  this.setState({
                    currenciesMenuIsOpen: !this.state.currenciesMenuIsOpen,
                  })
                }
              ></div>
              <ul className="currency-menu">
                {this.state.currencies.map((index) => {
                  return (
                    <li key={index.symbol} onClick={this.changeCurrensy}>
                      {index.symbol} {index.label}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, { setCurrency })(HeaderCurrency);
