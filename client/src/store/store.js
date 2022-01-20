import { configureStore } from "@reduxjs/toolkit";
import infoSlice from "./slices/info";

const store = configureStore({
    reducer: {
        infoSlice,
    }
});

export default store;