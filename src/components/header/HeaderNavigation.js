import React, { Component } from "react";
import { GET_CATEGOIES } from "../../queries/queries";
import { client } from "../../index";
import withRouter from "../withRouter";
import "../../styles/header.css";
import { NavLink } from "./headernavigation.styled";

class HeaderNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], location: "" };
  }

  componentDidMount() {
    this.fetchQuery();
    this.getLocation();
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.router?.location?.pathname !==
      prevProps.router?.location?.pathname
    )
      this.getLocation();
  }

  async fetchQuery() {
    const result = await client.query({
      query: GET_CATEGOIES,
    });

    this.setState({
      categories: [...result.data.categories],
    });
  }

  getLocation() {
    const router = this.props.router?.location?.pathname;
    this.setState({
      location: router.slice(1),
    });
  }

  render() {
    return (
      <nav>
        <ul>
          {this.state.categories?.map(({ name }, index) => (
            <li key={index}>
              <NavLink
                name={name}
                location={this.state.location}
                to={`/${name}`}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default withRouter(HeaderNavigation);
