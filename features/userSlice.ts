import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user_id: null,
    firstname: null,
    lastname: null,
    picture: null,
    email: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        user (state, action) {
            state.user_id = action.payload.user_id;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.picture = action.payload.picture;
            state.email = action.payload.email;
        }
    },
});

export const { user } = userSlice.actions;
export default userSlice.reducer;