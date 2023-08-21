import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'all'},
        ]
    )

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

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        let changedTodolist = todolists.find(todolist => todolist.id === todolistId)
        if (changedTodolist) {
            changedTodolist.filter = value
            setTodolists([...todolists])
        }
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
            {
                todolists.map(todolist => {

                    let tasksForTodolist = tasks  //здесь храним отфильтрованные таски

                    if (todolist.filter === 'active') {
                        tasksForTodolist = tasks.filter((task) => !task.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        tasksForTodolist = tasks.filter((task) => task.isDone)
                    }

                    return <Todolist
                        key={todolist.id}
                        id={todolist.id}
                        title={todolist.title}
                        tasks={tasksForTodolist}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        filter={todolist.filter}
                    />
                })
            }
        </div>
    );
}

export default App;

export type FilterValueType = 'all' | 'active' | 'completed'

type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}
