import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";

export const Dashboard = () => {
  return (
    <div>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};
