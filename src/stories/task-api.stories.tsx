import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";
import {taskAPI} from "../api/task-api";

export default {
    title: 'task-API'
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todolistId = 'bf38cfe1-8cc4-4e87-9fd6-bce69316c19a'
        taskAPI.getTask(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'bf38cfe1-8cc4-4e87-9fd6-bce69316c19a'
        taskAPI.createTask(todolistId, 'NEWTask').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'bf38cfe1-8cc4-4e87-9fd6-bce69316c19a'
        const taskId = 'b41baff8-5652-444f-a92f-0b93ef1a3c83'
        taskAPI.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'bf38cfe1-8cc4-4e87-9fd6-bce69316c19a'
        const taskId = 'b08f355b-5107-498b-8ea3-87cfa7e1dfa5'
        taskAPI.updateTask(todolistId, taskId, 'SOME NEW TASK TITLE').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}