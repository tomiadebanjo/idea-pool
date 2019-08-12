import React, { useContext } from "react";
import { Redirect } from "@reach/router";

import AuthContext from "../../context/AuthContext";

const UnprotectedRoute = ({ component: Component, ...rest }) => {
  const [auth] = useContext(AuthContext);

  if (auth) {
    return <Redirect to="./" noThrow />;
  }

  return <Component {...rest} />;
};

export default UnprotectedRoute;
