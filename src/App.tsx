import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import loadable from "@loadable/component";

import AppWrapper from "./components/appWrapper";
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
    <AppWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/quotes" element={<QuotesPage />} />
          <Route path="/quotes/:id" element={<QuotesPage />} />
        </Routes>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
