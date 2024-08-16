// components/PrivateRoute.js
import PropTypes from "prop-types";
// import { useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user } = useContext(AuthContext);
  // const location = useLocation();

  // write logic here to control private route and redirect

  // useEffect(() => {
  // pop up login form if user is not authenticated
  //   if (!user) {
  //     setShowForm("login");
  //   }
  // }, [user, setShowForm]);

  if (!user) {
    return <Navigate to="/unauthenticated" />;
  }

  return <Element {...rest} />;
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
