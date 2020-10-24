import "materialize-css/dist/css/materialize.min.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

import Header from "./Header";
import { Landing } from "./Landing";
import { Dashboard } from "./Dashboard";
import { SurveyNew } from "./surveys/SurveyNew";

const App = ({ fetchUser }) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/surveys" component={Dashboard} />
        <Route exact path="/surveys/new" component={SurveyNew} />
      </BrowserRouter>
    </div>
  );
};

export default connect(null, { fetchUser })(App);
