import React, { Component } from "react";
import { client } from "../index";
import "../styles/global.css";
import withRouter from "../components/withRouter";
import { GET_PRODUCT } from "../queries/queries";
import "../styles/product.css";
import { connect } from "react-redux";
import { setCurrency, addProductToCart } from "../store/cartSlice";

const mapStateToProps = (state) => ({
  currentCurrency: state.cart.currency,
  products: state.cart.products,
});

export class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      gallery: "",
      currentAttributes: [],
    };
  }
  addToCart() {
    const currentProduct = [...this.props.products];
    const currentAttributes = [];
    let skip = 0;
    this.state.product.attributes.forEach((attribute) => {
      this.state.currentAttributes.forEach((currentAttribute) => {
        if (attribute.name === currentAttribute.name) {
          currentAttributes.push({
            name: currentAttribute.name,
            value: currentAttribute.value,
          });
        }
      });
    });
    if (
      this.state.currentAttributes.length ===
      this.state.product.attributes.length
    ) {
      currentProduct.some((product) => product.id === this.state.product.id)
        ? currentProduct.forEach((product, index) => {
            if (
              JSON.stringify(product.attributes) ===
              JSON.stringify(currentAttributes)
            ) {
              currentProduct.splice(index, 1, {
                ...currentProduct[index],
                numberOfUnits: currentProduct[index].numberOfUnits + 1,
              });
            } else {
              skip++;
            }
          })
        : currentProduct.push({
            id: this.state.product.id,
            brand: this.state.product.brand,
            name: this.state.product.name,
            allAttributes: this.state.product.attributes,
            attributes: currentAttributes,
            gallery: this.state.product.gallery,
            prices: this.state.product.prices,
            numberOfUnits: 1,
          });
    }
    skip === currentProduct.length &&
      currentProduct.push({
        id: this.state.product.id,
        brand: this.state.product.brand,
        name: this.state.product.name,
        allAttributes: this.state.product.attributes,
        attributes: currentAttributes,
        gallery: this.state.product.gallery,
        prices: this.state.product.prices,
        numberOfUnits: 1,
      });
    this.props.addProductToCart(currentProduct);
  }
  setAttributes = (name, value) => {
    const currentAttributes = [...this.state.currentAttributes];
    currentAttributes.length !== 0
      ? currentAttributes.some((item) => item.name === name)
        ? currentAttributes.forEach((currentAttribute, index) => {
            currentAttribute?.name === name && currentAttribute.value === value
              ? currentAttributes.splice(index, 1)
              : currentAttributes[index]?.name === name &&
                currentAttributes.splice(index, 1, {
                  name: name,
                  value: value,
                });
          })
        : currentAttributes.push({ name: name, value: value })
      : currentAttributes.push({ name: name, value: value });
    this.setState({ currentAttributes: currentAttributes });
  };

  async fetchQuery() {
    const result = await client.query({
      query: GET_PRODUCT,
      variables: {
        id: this.props.router.location.pathname.slice(9),
      },
    });
    this.setState({
      product: result.data.product,
      gallery: result.data.product.gallery
        ? result.data.product.gallery[0]
        : null,
    });
  }
  componentDidMount() {
    this.fetchQuery();
  }
  render() {
    const currentAmount = this.state.product?.prices?.reduce(
      (currentAmount, { currency, amount }) => {
        if (currency?.symbol === this.props.currentCurrency) {
          currentAmount = amount;
        }
        return currentAmount;
      },
      ""
    );
    const attributes = this.state.product?.attributes?.map((attribute) => {
      return attribute;
    });
    return (
      <main
        className="main"
        style={{ opacity: `${!this.state.product.inStock ? "0.5" : "1"}` }}
      >
        <ul className="mini-gallery">
          {this.state.product?.gallery?.map((image) => {
            return (
              <li key={image}>
                <img
                  src={image}
                  alt={this.state.product.id}
                  onClick={() => this.setState({ gallery: image })}
                ></img>
              </li>
            );
          })}
        </ul>
        <div className="main-gallery">
          <img src={this.state.gallery} alt={this.state.product.id}></img>
          {!this.state.product.inStock ? (
            <h1 className="overlay">out of stock</h1>
          ) : null}
        </div>
        <div className="product-info">
          <h1>{this.state.product.brand}</h1>
          <h3>{this.state.product.name}</h3>
          <div className="product-attributes">
            <h4>PRICE:</h4>
            <p>
              {this.props.currentCurrency}
              {currentAmount}
            </p>
          </div>
          <div className="item-attributes">
            {attributes?.map((attribute) => {
              return (
                <div key={attribute.name} className="item-attribute">
                  <p>{attribute.name}:</p>
                  <div className="attribute-buttons">
                    {attribute.items.map((item) => {
                      return item.value.includes("#") ? (
                        item.id.includes("White") ? (
                          <button
                            key={item.value}
                            value={item.value}
                            style={
                              Boolean(
                                this.state.currentAttributes.find(
                                  (attributes) =>
                                    attributes.value === item.value &&
                                    attributes.name === attribute.name
                                )
                              ) && this.state.product?.inStock
                                ? {
                                    backgroundColor: `${item.value}`,
                                    outline: "1px solid #5ECE7B",
                                    outlineOffset: 2,
                                  }
                                : {
                                    backgroundColor: `${item.value}`,
                                    outline: "1px solid #1D1F22",
                                  }
                            }
                            onClick={(e) =>
                              this.setAttributes(attribute.name, e.target.value)
                            }
                          ></button>
                        ) : (
                          <button
                            key={item.value}
                            value={item.value}
                            style={
                              Boolean(
                                this.state.currentAttributes.find(
                                  (currentAttribute) =>
                                    currentAttribute.value === item.value &&
                                    currentAttribute.name === attribute.name
                                )
                              ) && this.state.product?.inStock
                                ? {
                                    backgroundColor: `${item.value}`,
                                    outline: "1px solid #5ECE7B",
                                    outlineOffset: 2,
                                  }
                                : {
                                    backgroundColor: `${item.value}`,
                                  }
                            }
                            onClick={(e) =>
                              this.setAttributes(attribute.name, e.target.value)
                            }
                          ></button>
                        )
                      ) : (
                        <button
                          key={item.value}
                          value={item.value}
                          style={
                            Boolean(
                              this.state.currentAttributes.find(
                                (currentAttribute) =>
                                  currentAttribute.value === item.value &&
                                  currentAttribute.name === attribute.name
                              ) && this.state.product?.inStock
                            )
                              ? {
                                  border: "1px solid #1D1F22",
                                  width: 65,
                                  height: 45,
                                  backgroundColor: "#1D1F22",
                                  color: "#ffffff",
                                }
                              : {
                                  border: "1px solid #1D1F22",
                                  width: 65,
                                  height: 45,
                                }
                          }
                          onClick={(e) =>
                            this.setAttributes(attribute.name, e.target.value)
                          }
                        >
                          {item.value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="add-to-cart"
            style={
              this.state.product?.inStock
                ? { cursor: "pointer" }
                : { cursor: "default" }
            }
            onClick={() => this.state.product?.inStock && this.addToCart()}
          >
            ADD TO CART
          </button>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: this.state.product.description }}
          ></div>
        </div>
      </main>
    );
  }
}

export default connect(mapStateToProps, { setCurrency, addProductToCart })(
  withRouter(ProductPage)
);
