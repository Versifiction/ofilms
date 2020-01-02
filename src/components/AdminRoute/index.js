import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
import { connect } from "react-redux";

import Spinner from "../Molecules/Spinner";
import NoAccess from "../NoAccess";
import Users from "../../pages/Users";

function AdminRoute({ component: Component, auth }) {
  const [user, setUser] = useState(false);
  const [pending, setPending] = useState(true);

  async function loadUser() {
    try {
      const dataUser = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/my-account/${auth.user.id}`
      );
      setUser(dataUser.data);
      setPending(false);
      M.AutoInit();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      loadUser();
    }
  }, []);

  return <>{user.isAdmin ? <Users /> : <NoAccess text="isNotAdmin" />}</>;
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(AdminRoute);
