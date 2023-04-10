import { listAPI } from "../api/api"

const GET_ALL_TODOS = 'simpletodo/list/GET_ALL_TODOS'
const DELETE_ALL_TODOS = 'simpletodo/list/DELETE_ALL_TODOS'
const ADD_TODO = 'simpletodo/list/ADD_TODO'
const RESOLVE_TODO = 'simpletodo/list/RESOLVE_TODO'
const DELETE_RESOLVED = 'simpletodo/list/DELETE_RESOLVED'

let initialState: {
    todoList: Todo[]
} = {
    todoList: []
}

// interfaces
interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

const listReducer = (state=initialState, action: {type: string, data: any}) => {
    switch (action.type) {
        case GET_ALL_TODOS: {
            if (localStorage.getItem('todos')) {
                return {
                    ...state,
                    todoList: JSON.parse(action.data)
                }
            } else {
                localStorage.setItem('todos', JSON.stringify(action.data))
                return {
                    ...state,
                    todoList: [...action.data]
                }
            }

            
        }
        case DELETE_ALL_TODOS: {
            localStorage.removeItem('todos')
            return {
                ...state,
                todoList: []

            }
        }
        case ADD_TODO: {
            let temp = [...state.todoList]
            temp.push({
                userId: 1,
                id: state.todoList.length + 1,
                title: action.data.title,
                completed: false,
            })
            localStorage.setItem('todos', JSON.stringify(temp))
            return {
                ...state,
                todoList: [...temp]

            }
        }
        case RESOLVE_TODO: {
            let temp = [...state.todoList].filter(e => {
                if (e.id === action.data) {
                    e.completed = true
                }
                return e
            })
            localStorage.setItem('todos', JSON.stringify(temp))
            return {
                ...state,
                todoList: [...temp]
            }
        }
        case DELETE_RESOLVED: {
            let temp = [...state.todoList].filter(e => e.id != action.data)
            localStorage.setItem('todos', JSON.stringify(temp))
            return {
                ...state,
                todoList: [...temp]
            }
        }
        default:
            return state
    }
}

// actions
export const getTodosAC = (data: Todo[]) => {
    return {
        type: GET_ALL_TODOS,
        data
    }
}

export const clearAllAC = () => {
    return {
        type: DELETE_ALL_TODOS
    }
}

export const addTodoAC = (data: {title: string}) => {
    return {
        type: ADD_TODO,
        data
    }
}

export const resolveTodoAC = (data: number) => {
    return {
        type: RESOLVE_TODO,
        data
    }
}

export const deleteResolvedAC = (data: number) => {
    return {
        type: DELETE_RESOLVED,
        data
    }
}

// thunks
export const getTodos = () => {
    return async (dispatch: any) => {
        let responce = await listAPI.getTodos()
        dispatch(getTodosAC(responce.data))
    }
}




export default listReducer