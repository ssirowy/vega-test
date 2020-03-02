import React from "react";

import { Editor } from "./Editor";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const App = () => (
  <Router>
    <Switch>
      <Route path="/" component={Editor} />
    </Switch>
  </Router>
);
