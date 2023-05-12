import { createSlice } from '@reduxjs/toolkit';
import { listAPI } from '../api/api';

const listSlice = createSlice({
    name: "list",
    initialState: {
        todoList: <any>[],
        todoCount: 0,
    },
    reducers: {
        getTodosR(state, action) {
            if (localStorage.getItem("todos")) {
                state.todoList = JSON.parse(localStorage.getItem('todos') || "")
                state.todoCount = JSON.parse(localStorage.getItem('todos') || "").length
            } else {
                localStorage.setItem("todos", JSON.stringify(action.payload))
                state.todoList = action.payload
                state.todoCount = action.payload.length
            }
        },
        clearAllR(state) {
            state.todoList = []
            localStorage.removeItem("todos")
        },
        addTodoR(state, action) {
            state.todoList.push(action.payload)
            state.todoCount += 1
            localStorage.setItem("todos", JSON.stringify(state.todoList))
        },
        resolveTodoR(state, action) {
            state.todoList = state.todoList.filter((e: any) => {
                e.id === action.payload && (e.completed = true)
                return e
            })
            localStorage.setItem("todos", JSON.stringify(state.todoList))
        },
        deleteResolvedR(state, action) {
            state.todoList = state.todoList.filter((e: any) => e.id !== action.payload)
            state.todoCount -= 1
            localStorage.setItem("todos", JSON.stringify(state.todoList))
        }
    }
})

export const getTodos = () => {
    return async (dispatch: any) => {
        let responce = await listAPI.getTodos()
        dispatch(getTodosR(responce.data))
    }
}

export default listSlice.reducer
export const { getTodosR, clearAllR, addTodoR, resolveTodoR, deleteResolvedR} = listSlice.actions