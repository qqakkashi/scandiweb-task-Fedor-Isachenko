import React, { PureComponent } from "react";
import { GET_CATEGOIES_AND_CURRENCIES } from "../queries/get_categories";
import { client } from "../index";
import logo_icon from "../images/logo-icon.svg";
import "../styles/header.css";
import "../styles/global.css";
import arrow_down from "../images/arrow-down.svg";
import arrow_up from "../images/arrow-up.svg";
import empty_cart from "../images/empty-cart.svg";
import { Link } from "react-router-dom";

export class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { categories: [], currencies: [], currenciesIsOpen: false };
  }

  componentDidMount() {
    this.fetchQuery();
  }

  async fetchQuery() {
    const result = await client.query({
      query: GET_CATEGOIES_AND_CURRENCIES,
    });

    this.setState({
      categories: [...result.data.categories],
      currencies: [...result.data.currencies],
    });
  }
  render() {
    console.log(this.state.currenciesIsOpen);
    return (
      <header>
        <nav>
          <ul>
            {this.state.categories?.map(({ name }, index) => (
              <li key={index}>
                <Link to={`category/${name}`}>{name.toUpperCase()}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <img style={{ marginLeft: "350px" }} src={logo_icon} alt="logo"></img>
        <div
          className="currency_change"
          onClick={() =>
            this.setState({
              currenciesIsOpen: !this.state.currenciesIsOpen,
            })
          }
        >
          <p>{this.state.currencies[0]?.symbol}</p>
          <img
            src={this.state.currenciesIsOpen ? arrow_up : arrow_down}
            alt={this.state.currenciesIsOpen ? "arrow up" : "arrow down"}
          />
        </div>

        <img style={{ marginLeft: "20px" }} src={empty_cart} alt="empty-cart" />
        {this.state.currenciesIsOpen && (
          <>
            <div
              className="currency_menu_background"
              onClick={() =>
                this.setState({
                  currenciesIsOpen: !this.state.currenciesIsOpen,
                })
              }
            ></div>
            <ul className="currency_menu">
              {this.state.currencies.map((index) => {
                return (
                  <li>
                    {index.symbol} {index.label}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </header>
    );
  }
}

export default Header;
