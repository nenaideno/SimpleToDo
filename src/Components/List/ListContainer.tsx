import React, { useEffect, useState, memo } from 'react'
import List from "./List"
import { compose } from 'redux';
import { connect } from 'react-redux';
import { addTodoAC, clearAllAC, deleteResolvedAC, getTodos, getTodosAC, resolveTodoAC } from "../../store/listReducer";
import Preloader from '../Preloader/Preloader';

const ListContainer = (props: any) => {

    let [isFetch, setIsFetch] = useState(true)
    useEffect(() => {
        if (!localStorage.getItem('todos')) {
            props.getTodos().then(() => {
                setIsFetch(false)
            })
        } else {
            props.getTodosAC(localStorage.getItem('todos'))
            setIsFetch(false)
        }

    }, [])
    if (isFetch) {
        return <Preloader />
    } else {
        return <List deleteResolvedAC={props.deleteResolvedAC} resolveTodoAC={props.resolveTodoAC} addTodoAC={props.addTodoAC} clearAllAC={props.clearAllAC} todoList={props.todoList} />
    }

}

const mapStateToProps = (state: any) => {
    return {
        todoList: state.list.todoList
    }
}

export default compose(connect(mapStateToProps,
    { getTodos, clearAllAC, addTodoAC, resolveTodoAC, deleteResolvedAC, getTodosAC }
))(ListContainer)