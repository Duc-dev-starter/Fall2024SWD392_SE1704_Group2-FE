import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './loadingSlice';
import forgotPasswordReducer from './forgotPasswordSlice';

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        forgotPassword: forgotPasswordReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
