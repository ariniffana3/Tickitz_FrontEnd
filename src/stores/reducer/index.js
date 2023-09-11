import { combineReducers } from "redux";

import movie from "./movieviewall";
import user from "./user";

export default combineReducers({
  movie,
  user,
});
