import Preloader from '../Preloader/Preloader'
import './List.scss'
import React, { useState } from 'react'

import { useForm } from "react-hook-form";

const List = (props: any) => {

    const { register, handleSubmit, reset, formState: { errors }} = useForm({mode: "onChange"});
    const onSubmit = (data: any) => {
        setIsSubmit(true)
        data.id = Date.now()
        data.completed = false
        data.title && props.addTodoR(data)
        reset()
        setIsSubmit(false)
    };


    let [isSubmit, setIsSubmit] = useState(false)
    let [completedCount, setCompleledCount] = useState(0)
    let [todoinput, setTodoInput] = useState('')

    let ListElement = props.todoList.map((e: any) => {
        if (e.completed) {
            completedCount += 1
            return (
                <div key={e.id} className="result-block">
                    <div className="round-completed"></div>
                    <span onClick={() => props.deleteResolvedR(e.id)} className="text-completed">{e.title}</span>
                </div>
            )
        } else {
            return (
                <div key={e.id} className="result-block">
                    <div className="block-round"></div>
                    <span onClick={() => props.resolveTodoR(e.id)} className="block-text">{e.title}</span>
                </div>
            )
        }
    })

    return <div className="list">
        <div className="list-content">
            <h1>Daily To Do List</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="content-search">
                    <input {...register("title", { minLength: 3 })} name='title' placeholder='Add new list item' type="text" />
                    <button type='submit'>Add</button>
                </div>
                <div className="content-search-error">
                    {(errors.title) && <span className='search-error'>The minimum number of characters in the title = 3</span>}
                </div>
            </form>
            <div className="content-result">
                {ListElement}
            </div>
            <div className="content-controls">
                <span>{completedCount} / {ListElement.length} tasks completed</span>
                <span onClick={() => props.clearAllR()} className='controls-clear'>Clear All</span>
            </div>
        </div>
    </div>
}

export default List;