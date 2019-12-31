import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";

import Nav from "../../components/Nav";

const mapStateToProps = (state, props) => ({
  auth: state[props.auth],
  errors: state[props.errors]
});

const NavContainer = connect(
  mapStateToProps,
  { logoutUser }
)(Nav);

export default NavContainer;
