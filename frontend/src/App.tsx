import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header/Header";
import ShoppingList from "./pages/ShoppingList";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ShoppingList />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
