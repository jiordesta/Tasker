import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    users:[],
    loadingUsers: false
}
const PATH = '/tma/user'

export const fetchUsers = createAsyncThunk('/fetch_all_users', async () => {
    try {
        const response = await axios.get(`${PATH}/fetch_all`)
        return response.data.users
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

const userSlice = createSlice({
    name:'user',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loadingUsers = true
        })
        builder.addCase(fetchUsers.rejected, (state) => {
            state.loadingUsers = false
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loadingUsers = false
            state.users = action.payload
        })
    }
})

export default userSlice.reducer