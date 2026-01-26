import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Slices/UserSlice";
import ProfileReducer from "./Slices/ProfileSlice";
import FilterReducer from "./Slices/FilterSlice";
import SortReducer from "./Slices/SortSlice";
import jwtReducer from "./Slices/JwtSlice";


export default configureStore({
    reducer: {
        user: UserReducer,
        profile: ProfileReducer,
        filter: FilterReducer,
        sort: SortReducer,
        jwt: jwtReducer
    }
})