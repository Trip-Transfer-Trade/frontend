import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import signupReducer from "./signupSlice";
import tripReducer from "./tripSlice";
import assetsReducer from "./assetsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    signup: signupReducer,
    trip: tripReducer,
    assets: assetsReducer,
  },
});

export default store;