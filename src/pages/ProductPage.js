import React, { Component } from "react";
import { client } from "../index";
import "../styles/global.css";
import withRouter from "../components/withRouter";
import { GET_PRODUCT } from "../queries/queries";
import "../styles/product.css";
import { connect } from "react-redux";
import { setCurrency } from "../store/cartSlice";

const mapStateToProps = (state) => ({
  currentCurrency: state.currency.currency,
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
  setAttributes = (name, value) => {
    const currentAttributes = [...this.state.currentAttributes];
    console.log(name, value);
    currentAttributes.length !== 0
      ? currentAttributes.some((item) => item.key === name)
        ? currentAttributes.forEach((currentAttribute, index) => {
            currentAttribute?.key === name && currentAttribute.value === value
              ? currentAttributes.splice(index, 1)
              : currentAttributes[index]?.key === name &&
                currentAttributes.splice(index, 1, {
                  key: name,
                  value: value,
                });
          })
        : currentAttributes.push({ key: name, value: value })
      : currentAttributes.push({ key: name, value: value });
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
  setGallery() {
    this.setState({ gallery: this.state.product?.gallery[0] });
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
    console.log(this.state.currentAttributes);

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
                            style={{
                              backgroundColor: `${item.value}`,
                              border: "1px solid #1D1F22",
                            }}
                            onClick={(e) =>
                              this.setAttributes(attribute.name, e.target.value)
                            }
                          ></button>
                        ) : (
                          <button
                            key={item.value}
                            value={item.value}
                            style={{ backgroundColor: `${item.value}` }}
                            onClick={(e) =>
                              this.setAttributes(attribute.name, e.target.value)
                            }
                          ></button>
                        )
                      ) : (
                        <button
                          key={item.value}
                          value={item.value}
                          style={{
                            border: "1px solid #1D1F22",
                            width: 63,
                            height: 43,
                          }}
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

          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: this.state.product.description }}
          ></div>
        </div>
      </main>
    );
  }
}

export default connect(mapStateToProps, { setCurrency })(
  withRouter(ProductPage)
);
