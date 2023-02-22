import React from "react";
import {Routes, Route, HashRouter} from "react-router-dom";
import loadable from "@loadable/component";

import "./App.scss";
import "./Text.scss";

const Waiter = () => <div>WAIT</div>;

const AboutPage = loadable(() => import("./pages/about"), {
  fallback: <Waiter />,
});

const QuotesPage = loadable(() => import("./pages/quotes"), {
  fallback: <Waiter />,
});

const NotFound = () => <div>Page Not Found</div>;

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<AboutPage />} />
        <Route path="/quotes" element={<QuotesPage />} />
        <Route path="/quotes/:id" element={<QuotesPage />} />
        <Route element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
