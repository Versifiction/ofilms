import { connect } from "react-redux";

import FloatingChat from "../../components/FloatingChat";

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const FloatingChatContainer = connect(mapStateToProps)(FloatingChat);

export default FloatingChatContainer;
