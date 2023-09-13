import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export const Todolist = (props: PropsType) => {

    const addTask = (title: string) => {
        props.addTask (title, props.id)
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }

    const deleteTodolistClickHandler = () => {
        props.removeTodolist(props.id)
    }

    const onChangeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    };

    return (
        <div>
            <strong>
                <EditableSpan title={props.title} onChange={onChangeTodolistTitleHandler}/>
            </strong>
            <button onClick={deleteTodolistClickHandler}>✖️</button>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map((task, index) => {

                    const onClickHandler = () => {
                        props.removeTask(task.id, props.id)
                    }

                    const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, event.currentTarget.checked, props.id)
                    }

                    const onChangeTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(task.id, newTitle, props.id)
                    };

                    return (
                        <li key={index} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeCheckboxHandler}/>
                            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
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

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (taskTitle: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
}