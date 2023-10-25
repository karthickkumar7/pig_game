import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: '',
    posts: 'this is a initial render',
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setUsers: (state, { payload }: { payload: string }) => {
            state.users = payload;
        },
        setPosts: (state, { payload }: { payload: string }) => {
            state.posts = payload;
        },
    },
});

export const { setPosts, setUsers } = dataSlice.actions;
export default dataSlice.reducer;
