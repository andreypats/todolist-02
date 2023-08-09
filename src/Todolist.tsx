import React, {useState} from "react";
import {FilterValueType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (taskTitle: string)=>void
    removeTask: (id:string)=>void
    changeFilter: (value: FilterValueType) => void
}
export const Todolist = (props: PropsType) => {

    let [taskTitle, setTaskTitle] = useState('')

    const addTaskTitle = () => {
        props.addTask(taskTitle)
        setTaskTitle('')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle} onChange={(event)=>{setTaskTitle(event.currentTarget.value)}}/>
                <button onClick={addTaskTitle}>+</button>
            </div>
            <ul>
                {props.tasks.map((task, index) => {
                    return (
                        <li key={index}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={()=>{props.removeTask(task.id)}}>✖️</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter('all')}}>All</button>
                <button onClick={()=>{props.changeFilter('active')}}>Active</button>
                <button onClick={()=>{props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )

}