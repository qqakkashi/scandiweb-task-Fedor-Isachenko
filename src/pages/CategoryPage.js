import React, { PureComponent } from "react";
import { client } from "..";
import { GET_PRODUCTS } from "../queries/queries";
import "../styles/global.css";
import withRouter from "../components/withRouter";
import "../styles/category.css";
import { Link } from "react-router-dom";
import CategoryPrice from "../components/category/CategoryPrice";

export class CategoryPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { category: "", products: [], attributes: {} };
  }
  async fetchQuery() {
    const result = await client.query({
      query: GET_PRODUCTS,
      variables: {
        category: this.props.router?.location?.pathname?.slice(1),
      },
    });
    this.setState({
      category: result.data.category.name,
      products: result.data.category.products,
    });
  }

  componentDidMount() {
    this.fetchQuery();
  }
  componentDidUpdate(prevProps) {
    if (this.props.router !== prevProps.router) {
      this.fetchQuery();
    }
  }

  render() {
    console.log(this.state.category, " category");
    console.log(this.state.products, " products");
    return (
      <main>
        <h1>{this.state.category}</h1>
        <ul className="items_list">
          {this.state.products.map((products) => {
            return (
              <li key={products.id}>
                <Link to={`/product/${products.id}`} key={products.prices}>
                  <img
                    src={products.gallery[0]}
                    alt={products.gallery[0]}
                  ></img>
                  <h3>
                    {products.brand} {products.name}
                  </h3>
                  <CategoryPrice prices={products.prices} />
                </Link>
                ,
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
}

export default withRouter(CategoryPage);
