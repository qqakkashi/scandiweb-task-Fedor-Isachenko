import { PureComponent } from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";

export class App extends PureComponent {
  render() {
    return (
      <>
        <Header />
        <Routes>
          <Route index element={<CategoryPage />} />
          <Route path="category/:category" element={<CategoryPage />} />
          <Route path="product/:product" element={<ProductPage />} />
        </Routes>
      </>
    );
  }
}

export default App;
