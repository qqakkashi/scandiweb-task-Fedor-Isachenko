import { PureComponent } from "react";
import Header from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";

export class App extends PureComponent {
  render() {
    return (
      <>
        <Header />
        <Routes>
          <Route index element={<CategoryPage />} />
          <Route path=":category" element={<CategoryPage />} />
          <Route path="product/:product" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
        </Routes>
      </>
    );
  }
}

export default App;
