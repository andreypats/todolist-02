import React, {ChangeEvent, useState} from "react";
import {FilterValueType} from "./App";

export const Todolist = (props: PropsType) => {

    let [taskTitle, setTaskTitle] = useState('')

    const addTaskTitle = () => {
        props.addTask(taskTitle)
        setTaskTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTaskTitle}>+</button>
            </div>
            <ul>
                {props.tasks.map((task, index) => {

                    const onClickHandler = () => {
                        props.removeTask(task.id)
                    }

                    return (
                        <li key={index}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>✖️</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
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
    title: string
    tasks: Array<TaskType>
    addTask: (taskTitle: string) => void
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
}