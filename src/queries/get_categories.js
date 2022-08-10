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
