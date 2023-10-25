import { configureStore } from '@reduxjs/toolkit';
import data from '@/redux/data-slice';

export const store = configureStore({
    reducer: {
        data,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
