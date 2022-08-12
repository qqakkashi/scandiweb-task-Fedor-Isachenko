import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GET_CATEGOIES } from "../../queries/queries";
import { client } from "../../index";
import withRouter from "../withRouter";
import "../../styles/header.css";

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
              <Link
                style={{
                  color: `${
                    name === this.state.location ? `#5ECE7B` : `#1D1F22`
                  }`,
                  fontWeight: `${name === this.state.location ? 600 : 400}`,
                  borderBottom: `${
                    name === this.state.location ? "2px solid #5ECE7B" : "none"
                  }`,
                }}
                to={`/${name}`}
                location={this.props.router.location.pathname}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default withRouter(HeaderNavigation);
