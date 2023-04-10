import Preloader from '../Preloader/Preloader'
import './List.scss'
import React, { useState } from 'react'

import { useForm } from "react-hook-form";

const List = (props: any) => {

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const onSubmit = (data: any) => {
        props.addTodoAC(data)
        reset()
    };

    let [completedCount, setCompleledCount] = useState(0)

    let ListElement = props.todoList.map((e: any) => {
        if (e.completed) {
            completedCount += 1
            return (
                <div key={e.id} className="result-block">
                    <div className="round-completed"></div>
                    <span onClick={() => props.deleteResolvedAC(e.id)} className="text-completed">{e.title}</span>
                </div>
            )
        } else {
            return (
                <div key={e.id} className="result-block">
                    <div className="block-round"></div>
                    <span onClick={() => props.resolveTodoAC(e.id)} className="block-text">{e.title}</span>
                </div>
            )
        }
    })

    return <div className="list">
        <div className="list-content">
            <h1>Daily To Do List</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="content-search">
                    <input defaultValue='' {...register("title")} placeholder='Add new list item' type="text" />
                    <button type='submit'>Add</button>
                </div>
            </form>
            <div className="content-result">
                {ListElement}
            </div>
            <div className="content-controls">
                <span>{completedCount} / {ListElement.length} tasks completed</span>
                <span onClick={() => props.clearAllAC()} className='controls-clear'>Clear All</span>
            </div>
        </div>
    </div>
}

export default List;