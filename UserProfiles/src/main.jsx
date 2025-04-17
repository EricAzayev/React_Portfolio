import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./routes/Layout.jsx";
import ProfileEdit from "./routes/ProfileEdit.jsx";
import ProfileCreate from "./routes/ProfileCreate.jsx";
import NotFound from "./routes/NotFound.jsx";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route index={false} path="/edit/:id" element={<ProfileEdit />} />

          <Route index={false} path="/create" element={<ProfileCreate />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
