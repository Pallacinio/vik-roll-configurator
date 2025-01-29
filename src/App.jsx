
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProductList from "./pages/ProductList.jsx";
import ProductColors from "./pages/ProductColors.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import OrderSummary from "./pages/OrderSummary.jsx";
import Content from "./components/content/Content.jsx";
import Footer from "./components/footer/Footer.jsx";
import { CartProvider } from "./context/CartContext"; 
import Header from "./components/header/Header.jsx";

function App() {
  return (
    <CartProvider>
      <Header/>
      <BrowserRouter>
        <Content>
          <Routes>
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:productId" element={<ProductColors />} />
            <Route path="/product/details" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} /> 
            <Route path="/order-summary" element={<OrderSummary />} />
          </Routes>
        </Content>
      </BrowserRouter>
      <Footer/>
    </CartProvider>
  );
}

export default App;
