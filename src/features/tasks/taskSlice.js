import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: "1",
        title: "Tarea 1",
        description: "Prueba 1 dummy text",
        completed: false,
    },
    {  
        id: "2",
        title: "Tarea 2",
        description: "Prueba 2 dummy text",
        completed: false},
  ]

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload)
        },
        deleteTask: (state, action) => {
            return state.filter(tarea => tarea.id !== action.payload)
        },
        editTask: (state, action) => {
            const {id, title, description} = action.payload

            const foundTask = state.find(task => task.id === id)

            if(foundTask){
                foundTask.title = title
                foundTask.description = description
            }
        }
    }
})

export const { addTask, deleteTask, editTask } = taskSlice.actions
export default taskSlice.reducer