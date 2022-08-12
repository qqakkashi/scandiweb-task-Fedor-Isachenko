import React, { PureComponent } from "react";
import { GET_CATEGOIES_AND_CURRENCIES } from "../../queries/queries";
import { client } from "../../index";
import logo_icon from "../../images/logo-icon.svg";
import "../../styles/header.css";
import "../../styles/global.css";

import empty_cart from "../../images/empty-cart.svg";
import HeaderNavigation from "./HeaderNavigation";
import HeaderCurrency from "./HeaderCurrency";

export class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currencies: [],
      currenciesMenuIsOpen: false,
      location: "",
    };
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
    return (
      <header>
        <HeaderNavigation />
        <img style={{ marginLeft: "350px" }} src={logo_icon} alt="logo"></img>
        <HeaderCurrency />
        <img style={{ marginLeft: "20px" }} src={empty_cart} alt="empty-cart" />
      </header>
    );
  }
}

export default Header;
