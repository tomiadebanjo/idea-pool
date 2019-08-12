import React, { useContext } from "react";
import { Redirect } from "@reach/router";

import AuthContext from "../../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [auth] = useContext(AuthContext);

  if (auth) {
    return <Component {...rest} />;
  }

  return <Redirect to="/login" noThrow />;
};

export default PrivateRoute;
