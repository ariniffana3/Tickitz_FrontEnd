import { combineReducers } from "redux";

import movie from "./movieviewall";
import user from "./user";

export default combineReducers({
  // counter : counter
  movie,
  user,
});
