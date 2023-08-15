import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ])

    const addTask = (taskTitle: string) => {
        let task = {id: v1(), title: taskTitle, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks)
    }

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter((task) => (task.id !== id))
        setTasks(filteredTasks)
    }

    let [filter, setFilter] = useState<FilterValueType>('all')

    let tasksForTodolist = tasks  //здесь храним отфильтрованные таски

    if (filter === 'active') {
        tasksForTodolist = tasks.filter((task) => !task.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter((task) => task.isDone)
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        let changedTask = tasks.find(task => task.id === id)
        if (changedTask) {
            changedTask.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
