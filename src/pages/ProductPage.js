import React, { Component } from "react";
import { client } from "../index";
import "../styles/global.css";
import DOMPurify from "dompurify";
import withRouter from "../components/withRouter";
import { GET_PRODUCT } from "../queries/queries";
import "../styles/product.css";
import { connect } from "react-redux";
import { setCurrency, addProductToCart } from "../store/cartSlice";
import {
  Button,
  ButtonAddToCard,
  ButtonColor,
  Main,
} from "../components/product/product.styled";

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
    if (currentAttributes.length !== 0) {
      if (currentAttributes.some((item) => item.name === name)) {
        currentAttributes.forEach((currentAttribute, index) => {
          currentAttribute?.name === name && currentAttribute.value === value
            ? currentAttributes.splice(index, 1)
            : currentAttributes[index]?.name === name &&
              currentAttributes.splice(index, 1, {
                name: name,
                value: value,
              });
        });
      } else {
        currentAttributes.push({ name: name, value: value });
      }
    } else {
      currentAttributes.push({ name: name, value: value });
    }
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
      <Main className="main" inStock={this.state.product.inStock}>
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
                  <div className="attribute-Buttons">
                    {attribute.items.map((item) => {
                      return item.value.includes("#") ? (
                        <ButtonColor
                          key={item.value}
                          value={item.value}
                          currentAttributes={this.state.currentAttributes}
                          inStock={this.state.product?.inStock}
                          name={attribute.name}
                          onClick={(e) =>
                            this.setAttributes(attribute.name, e.target.value)
                          }
                        ></ButtonColor>
                      ) : (
                        <Button
                          key={item.value}
                          value={item.value}
                          currentAttributes={this.state.currentAttributes}
                          inStock={this.state.product?.inStock}
                          name={attribute.name}
                          onClick={(e) =>
                            this.setAttributes(attribute.name, e.target.value)
                          }
                        >
                          {item.value}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <ButtonAddToCard
            inStock={this.state.product?.inStock}
            onClick={() => this.state.product?.inStock && this.addToCart()}
          >
            ADD TO CART
          </ButtonAddToCard>
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(this.state.product.description),
            }}
          ></div>
        </div>
      </Main>
    );
  }
}

export default connect(mapStateToProps, { setCurrency, addProductToCart })(
  withRouter(ProductPage)
);
