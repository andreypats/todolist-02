import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";

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

    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        let changedTodolist = todolists.find(todolist => todolist.id === todolistId)
        if (changedTodolist) {
            changedTodolist.title = newTitle
            setTodolists([...todolists])
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
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
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

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={todolist.id}
                                        id={todolist.id}
                                        title={todolist.title}
                                        tasks={tasksForTodolist}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        filter={todolist.filter}
                                        removeTodolist={removeTodolist}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
