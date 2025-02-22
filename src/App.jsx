import React from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import ProductList from "./pages/ProductList.jsx";
import ProductColors from "./pages/ProductColors.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import OrderSummary from "./pages/OrderSummary.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import Login from "./pages/Login.jsx";
import Content from "./components/content/Content.jsx";
import Footer from "./components/footer/Footer.jsx";
import { CartProvider } from "./context/CartContext"; 
import Header from "./components/header/Header.jsx";
import BackButton from "./components/backButton/BackButton.jsx";
import Home from "./pages/Home.jsx";

function Layout() {
  const location = useLocation();

  return (
    <>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:productId" element={<ProductColors />} />
          <Route path="/product/details" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} /> 
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Content>
      <BackButton />
      {location.pathname !== "/" && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout /> 
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
