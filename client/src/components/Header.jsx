import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = ({ auth }) => {
  console.log("auth!!", auth);

  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      case true:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
      default:
        return;
    }
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={auth ? "/surveys" : "/"} className="left brand-logo">
          Emaily
        </Link>
      </div>
      <ul className="right">{renderContent()}</ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Header);
