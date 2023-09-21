import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Button, Checkbox} from "@mui/material";

export const Todolist = (props: PropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
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
            <IconButton
                aria-label="delete"
                onClick={deleteTodolistClickHandler}
            >
                <DeleteIcon/>
            </IconButton>
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
                            <Checkbox
                                color='primary'
                                checked={task.isDone}
                                onChange={onChangeCheckboxHandler}
                            />
                            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                            <IconButton
                                aria-label="delete"
                                onClick={onClickHandler}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color='inherit'>
                    All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color='primary'>
                    Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color='secondary'>
                    Completed
                </Button>
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