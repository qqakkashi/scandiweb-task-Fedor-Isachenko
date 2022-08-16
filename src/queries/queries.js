import { gql } from "@apollo/client";

export const GET_CATEGOIES_AND_CURRENCIES = gql`
  query {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;
export const GET_CATEGOIES = gql`
  query {
    categories {
      name
    }
  }
`;
export const GET_PRODUCTS = gql`
  query getProductByCategory($category: String!) {
    category(input: { title: $category }) {
      name
      products {
        name
        id
        brand
        gallery
        inStock
        category
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const GET_PRODUCTS_PRICE = gql`
  query getProductByCategory($category: String!) {
    category(input: { title: $category }) {
      products {
        name
        id
        prices {
          currency {
            symbol
          }
          amount
        }
      }
    }
  }
`;
export const GET_PRODUCT = gql`
  query getProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      attributes {
        name
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;
