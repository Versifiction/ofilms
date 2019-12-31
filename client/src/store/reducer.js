import { combineReducers } from "redux";

import authReducer from "./reducers/auth-reducer";
import errorReducer from "./reducers/error-reducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
