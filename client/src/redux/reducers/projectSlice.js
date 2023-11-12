import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    projects: [],
    loadingProjects: false,
    createProjectDrawer: false,
    loadingCreate: false
}

const PATH = '/tma/project'

export const createProject = createAsyncThunk('/create_project', async ({title, description, image, start, end, members}) => {
    try {
        const data = new FormData()
        data.append('title',title)
        data.append('description', description)
        data.append('image', image)
        data.append('start', start)
        data.append('end', end)
        data.append('members',members.map((member) => member._id))
        const response = await axios.post(`${PATH}/create`,data)
        return response.data.project
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})

const projectSlice = createSlice({
    name:'project',
    initialState,
    reducers:{
        openCreateProjectDrawer:(state, action) => {
            state.createProjectDrawer = action.payload
        }
    },

    extraReducers:(builder) => {
        builder.addCase(createProject.pending, (state) => {
            state.loadingCreate = true
        })
        builder.addCase(createProject.rejected, (state) => {
            state.loadingCreate = false
        })
        builder.addCase(createProject.fulfilled, (state) => {
            state.loadingCreate = false
        })
    }
})

export default projectSlice.reducer
export const {openCreateProjectDrawer} = projectSlice.actions