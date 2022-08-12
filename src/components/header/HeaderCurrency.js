import React, { Component } from "react";
import { client } from "../../index";
import { GET_CATEGOIES_AND_CURRENCIES } from "../../queries/queries";
import arrow_down from "../../images/arrow-down.svg";
import arrow_up from "../../images/arrow-up.svg";
import { connect } from "react-redux";
import { setCurrency } from "../../store/cartSlice";

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
});

class HeaderCurrency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      currency: "",
      currenciesMenuIsOpen: false,
      location: "",
    };
  }

  componentDidMount() {
    this.fetchQuery();
  }

  changeCurrensy = (event) => {
    this.setState({ currency: event.target.firstChild.data });
    this.props.setCurrency(event.target.firstChild.data);
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
          className="currency_change"
          onClick={() =>
            this.setState({
              currenciesMenuIsOpen: !this.state.currenciesMenuIsOpen,
            })
          }
        >
          <p>{this.props?.currency}</p>
          <img
            src={this.state.currenciesMenuIsOpen ? arrow_up : arrow_down}
            alt={this.state.currenciesMenuIsOpen ? "arrow up" : "arrow down"}
          />
        </div>
        {this.state.currenciesMenuIsOpen && (
          <>
            <div
              className="currency_menu_background"
              onClick={() =>
                this.setState({
                  currenciesMenuIsOpen: !this.state.currenciesMenuIsOpen,
                })
              }
            ></div>
            <ul className="currency_menu">
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
      </>
    );
  }
}

export default connect(mapStateToProps, { setCurrency })(HeaderCurrency);
