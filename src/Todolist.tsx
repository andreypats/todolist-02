import React, {ChangeEvent, useState} from "react";
import {FilterValueType} from "./App";

export const Todolist = (props: PropsType) => {

    let [taskTitle, setTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTaskTitle = () => {
        if (taskTitle.trim() !== '') {
            props.addTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskTitle()
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={onChangeInputHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskTitle}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((task, index) => {

                    const onClickHandler = () => {
                        props.removeTask(task.id)
                    }

                    const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, event.currentTarget.checked)
                    }

                    return (
                        <li key={index} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeCheckboxHandler}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>✖️</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>
                    All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>
                    Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>
        </div>
    )
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (taskTitle: string) => void
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
}