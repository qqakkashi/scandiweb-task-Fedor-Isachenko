import React, { Component } from "react";
import { connect } from "react-redux";
import minus_square from "../images/minus-square.svg";
import plus_square from "../images/plus-square.svg";
import { addProductToCart } from "../../store/cartSlice";

const mapStateToProps = (state) => ({
  products: state.cart.products,
});

export class QuantityCart extends Component {
  constructor(props) {
    super(props);
    this.state = { numberOfUnits: 0 };
  }
  componentDidMount() {
    this.setState({ numberOfUnits: this.props?.numberOfUnits });
  }
  changeNumberOfUnits(action) {
    action === "+"
      ? this.setState({ numberOfUnits: this.state.numberOfUnits + 1 })
      : this.setState({ numberOfUnits: this.state.numberOfUnits - 1 });
    const currentProduct = [...this.props.products];
    if (this.props.allAttributes.length === this.props.attributes.length) {
      if (currentProduct.some((product) => product.id === this.props?.id)) {
        currentProduct.forEach((product, index) => {
          if (
            JSON.stringify(product.attributes) ===
            JSON.stringify(this.props.attributes)
          ) {
            action === "+"
              ? currentProduct.splice(index, 1, {
                  ...currentProduct[index],
                  numberOfUnits: currentProduct[index].numberOfUnits + 1,
                })
              : currentProduct.splice(index, 1, {
                  ...currentProduct[index],
                  numberOfUnits: currentProduct[index].numberOfUnits - 1,
                });
          }
        });
      }
    }
    this.props.addProductToCart(currentProduct);
  }
  render() {
    return (
      <div className="product-quantity">
        <img
          src={plus_square}
          alt={plus_square}
          onClick={() => this.changeNumberOfUnits("+")}
        />
        {this.state.numberOfUnits}
        <img
          src={minus_square}
          alt={minus_square}
          onClick={() => this.changeNumberOfUnits("-")}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, { addProductToCart })(QuantityCart);
