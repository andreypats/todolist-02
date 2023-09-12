import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter((todolist) => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTask = (taskTitle: string, todolistId: string) => {
        let task = {id: v1(), title: taskTitle, isDone: false};
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks})
    }

    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter((task) => (task.id !== id))
        setTasks({...tasks})
    }

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        let changedTodolist = todolists.find(todolist => todolist.id === todolistId)
        if (changedTodolist) {
            changedTodolist.filter = value
            setTodolists([...todolists])
        }
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let changedTask = todolistTasks.find(task => task.id === id)
        if (changedTask) {
            changedTask.isDone = isDone
            setTasks({...tasks})
        }
    }

    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let changedTask = todolistTasks.find(task => task.id === id)
        if (changedTask) {
            changedTask.title = newTitle
            setTasks({...tasks})
        }
    }

    const addTodolist = (title: string) => {
        let newTodolistId = v1();
        let newTodolist: TodolistsType = {id: newTodolistId, title: title, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(todolist => {

                    let allTodolistsTasks = tasks[todolist.id]
                    let tasksForTodolist = allTodolistsTasks

                    if (todolist.filter === 'active') {
                        tasksForTodolist = allTodolistsTasks.filter((task) => !task.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        tasksForTodolist = allTodolistsTasks.filter((task) => task.isDone)
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
                        changeTaskTitle={changeTaskTitle}
                        filter={todolist.filter}
                        removeTodolist={removeTodolist}
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

type TasksStateType = {
    [key: string]: Array<TaskType>
}
