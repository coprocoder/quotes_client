import React from "react";
import {Routes, Route, HashRouter} from "react-router-dom";
import loadable from "@loadable/component";

import Waiter from "./components/waiter";

import "./App.scss";
import "./Text.scss";

const AboutPage = loadable(() => import("./pages/about"), {
  fallback: <Waiter />,
});

const QuotesPage = loadable(() => import("./pages/quotes"), {
  fallback: <Waiter />,
});

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/quotes" element={<QuotesPage />} />
        <Route path="/quotes/:id" element={<QuotesPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
