import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Slices/UserSlice";
import ProfileReducer from "./Slices/ProfileSlice";


export default configureStore({
    reducer : {
        user : UserReducer,
        profile : ProfileReducer
    }
})