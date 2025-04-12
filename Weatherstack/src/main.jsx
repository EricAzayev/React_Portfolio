import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./routes/Layout.jsx";
import DetailView from "./routes/DetailView.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index={true} element={<App />} />
        <Route
          index={false}
          path="/detail/:symbol"
          element={<DetailView />}
        ></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
