import { applyMiddleware, combineReducers, createStore } from "redux";
import listReducer from "./listReducer";
import thunk from "redux-thunk";


let store = createStore(combineReducers({
    list: listReducer,
}), applyMiddleware(thunk))

export default store