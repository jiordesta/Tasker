import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const PATH = '/tma/auth'
const initialState = {
    user: null,
    loadingLogin: false,
    loadingRegister: false,
    loadingUser: false,
    loadingLogout: false
}

export const register = createAsyncThunk('/register', async (inputs) => {
    try {
        const data = new FormData()
        data.append('fname',inputs.fname)
        data.append('lname',inputs.lname)
        data.append('description',inputs.description)
        data.append('username',inputs.username)
        data.append('password',inputs.password)
        data.append('image',inputs.image)
        const response = await axios.post(`${PATH}/register`, data)
        return response.data.user
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

export const login = createAsyncThunk('/login', async (inputs) => {
    try {
        const data = new FormData()
        data.append('username', inputs.username)
        data.append('password', inputs.password)
        const response = await axios.post(`${PATH}/login`, data)
        return response.data.user
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

export const authenticate = createAsyncThunk('/authenticate', async () => {
    try {
        const response = await axios.get(`${PATH}/authenticate`)
        return response.data.user
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

export const logout = createAsyncThunk('/logout', async () => {
    try {
        const response = await axios.post(`${PATH}/logout`)
        return response.data.user
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

const authSlice = createSlice({
    name:'auth',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(register.pending, (state) => {
            state.loadingRegister = true
        })
        builder.addCase(register.rejected, (state) => {
            state.loadingRegister = false
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.loadingRegister = false
        })

        builder.addCase(login.pending, (state) => {
            state.loadingLogin = true
        })
        builder.addCase(login.rejected, (state) => {
            state.loadingLogin = false
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loadingLogin = false
            state.user = action.payload
        })

        builder.addCase(authenticate.pending, (state) => {
            state.loadingUser = true
        })
        builder.addCase(authenticate.rejected, (state) => {
            state.loadingUser = false
        })
        builder.addCase(authenticate.fulfilled, (state, action) => {
            state.loadingUser = false
            state.user = action.payload
        })

        builder.addCase(logout.pending, (state) => {
            state.loadingLogout = true
        })
        builder.addCase(logout.rejected, (state) => {
            state.loadingLogout = false
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.loadingLogout = false
            state.user = null
        })
    }
})

export default authSlice.reducer