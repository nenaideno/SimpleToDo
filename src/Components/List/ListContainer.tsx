import React, { useEffect, useState } from 'react'
import List from "./List"
import { compose } from 'redux';
import { connect } from 'react-redux';
import { addTodoR, clearAllR, deleteResolvedR, getTodos, getTodosR, resolveTodoR } from "../../store/listSlice";
import Preloader from '../Preloader/Preloader';

const ListContainer = (props: any) => {

    let [isFetch, setIsFetch] = useState(true)
    useEffect(() => {
        if (!localStorage.getItem('todos')) {
            props.getTodos().then(() => {
                setIsFetch(false)
            })
        } else {
            props.getTodosR(localStorage.getItem('todos'))
            setIsFetch(false)
        }

    }, [])
    if (isFetch) {
        return <Preloader />
    } else {
        return <List todoCount={props.todoCount} deleteResolvedR={props.deleteResolvedR} resolveTodoR={props.resolveTodoR} addTodoR={props.addTodoR} clearAllR={props.clearAllR} todoList={props.todoList} />
    }

}

const mstp = (state: any) => {
    return {
        todoList: state.list.todoList,
        todoCount: state.list.todoCount,
    }
}

export default compose(connect(mstp,
    { getTodos, clearAllR, addTodoR, resolveTodoR, deleteResolvedR, getTodosR }
))(ListContainer)