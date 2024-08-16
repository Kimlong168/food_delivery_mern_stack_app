// components/AdminRoute.js
import PropTypes from "prop-types";
// import { useLocation, Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminRoute = ({ element: Element, ...rest }) => {
  // const { user } = useContext(AuthContext);

  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const decodedToken = jwtDecode(token);

    console.log("decoded token: ", decodedToken);

    // Check if the user is an admin by verifying the role in the token
    if (decodedToken.user.isAdmin) {
      return <Element {...rest} />;
    } else {
      // If not an admin, redirect to unauthorized page
      return <Navigate to="/unauthorized" />;
    }
  } catch (error) {
    // If token is invalid or can't be decoded, redirect to unauthorized
    return <Navigate to="/unauthorized" />;
  }
};

AdminRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};

export default AdminRoute;
