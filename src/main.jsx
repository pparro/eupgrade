import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Guide from "./Guide.jsx";
import Faq from "./Faq.jsx";
import RoutePage from "./RoutePage.jsx";
import FlightPage from "./FlightPage.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/routes/:slug" element={<RoutePage />} />
        <Route path="/flights/:flight" element={<FlightPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
