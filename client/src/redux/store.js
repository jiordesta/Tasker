import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./reducers/authSlice";
import notificationSlice from "./reducers/notificationSlice";
import projectSlice from "./reducers/projectSlice";
import userSlice from "./reducers/userSlice";

export const store = configureStore({
    reducer:{
        auth: authSlice,
        notif: notificationSlice,
        project: projectSlice,
        user: userSlice
    }
})