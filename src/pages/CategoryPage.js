import React, { PureComponent } from "react";
import { client } from "..";
import { GET_PRODUCTS } from "../queries/queries";
import "../styles/global.css";
import withRouter from "../components/withRouter";
import "../styles/category.css";
import { Link } from "react-router-dom";
import CategoryPrice from "../components/category/CategoryPrice";
import circleIcon from "../components/images/circle-icon.svg";
import { connect } from "react-redux";
import { addProductToCart } from "../store/cartSlice";
import { H3 } from "../components/category/categorypage.styled";

const mapStateToProps = (state) => ({
  currentCurrency: state.cart.currency,
  products: state.cart.products,
});

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
    const currentProduct = [...this.props.products];

    return (
      <main>
        <h1>{this.state.category}</h1>
        <ul className="items_list">
          {this.state.products.map((products) => {
            const currentAttributes = products.attributes.map((attribute) => {
              return { name: attribute.name, value: attribute.items[0].value };
            });
            return (
              <li key={products.id}>
                <Link to={`/product/${products.id}`} key={products.prices}>
                  <div className="gallery-block">
                    <img
                      src={products.gallery[0]}
                      alt={products.gallery[0]}
                    ></img>
                    {!products.inStock && (
                      <div className="overlay">
                        <h1>out of stock</h1>
                      </div>
                    )}
                  </div>

                  <H3 inStock={products.inStock}>
                    {products.brand} {products.name}
                  </H3>
                  <CategoryPrice
                    prices={products.prices}
                    inStock={products.inStock}
                  />
                </Link>
                {products.inStock && (
                  <img
                    src={circleIcon}
                    alt="circle-icon"
                    className="circle-icon"
                    onClick={() => {
                      currentProduct.some(
                        (product) => product.id === products.id
                      )
                        ? currentProduct.forEach((product, index) => {
                            if (
                              JSON.stringify(product.attributes) ===
                              JSON.stringify(currentAttributes)
                            ) {
                              currentProduct.splice(index, 1, {
                                ...currentProduct[index],
                                numberOfUnits:
                                  currentProduct[index].numberOfUnits + 1,
                              });
                            }
                          })
                        : currentProduct.push({
                            id: products.id,
                            brand: products.brand,
                            name: products.name,
                            allAttributes: products.attributes,
                            attributes: currentAttributes,
                            gallery: products.gallery,
                            prices: products.prices,
                            numberOfUnits: 1,
                          });
                      this.props.addProductToCart(currentProduct);
                    }}
                  ></img>
                )}
              </li>
            );
          })}
        </ul>
      </main>
    );
  }
}

export default connect(mapStateToProps, { addProductToCart })(
  withRouter(CategoryPage)
);
