import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Rest API", isDone: false},
        {id: 5, title: "GraphQL", isDone: false},
    ])

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter((task) => (task.id !== id))
        setTasks(filteredTasks)
    }

    let [filter, setFilter] = useState<FilterValueType>('all')

    let tasksForTodolist = tasks  //здесь храним отфильтрованные таски

    if (filter === 'active') {
        tasksForTodolist = tasks.filter((task) => (!task.isDone === false))
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter((task) => (!task.isDone === true))
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
