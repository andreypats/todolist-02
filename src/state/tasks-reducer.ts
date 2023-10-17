import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType} from "./todolists-reducer";


export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks.filter((task) => (task.id !== action.id))
            return {...state}
        case 'ADD-TASK':
            let task = {id: v1(), title: action.taskTitle, isDone: false};
            state[action.todolistId] = [task, ...state[action.todolistId]];
            return {...state}
        case 'CHANGE-TASK-STATUS':
            let changedTaskStatus = state[action.todolistId].find(task => task.id === action.id)
            if (changedTaskStatus) {
                changedTaskStatus.isDone = action.isDone
            }
            return {...state}
        case 'CHANGE-TASK-TITLE':
            let changedTaskTitle = state[action.todolistId].find(task => task.id === action.id)
            if (changedTaskTitle) {
                changedTaskTitle.title = action.newTitle
            }
            return {...state}

        default:
            throw new Error('I don\'t understand this type')
    }
}


// ActionCreators
export const removeTaskAC = (id: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id: id, todolistId: todolistId}
}

export const addTaskAC = (taskTitle: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', taskTitle: taskTitle, todolistId: todolistId}
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', id: id, isDone: isDone, todolistId: todolistId}
}

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', id: id, newTitle: newTitle, todolistId: todolistId}
}

// Types
type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    id: string,
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    taskTitle: string,
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    id: string,
    isDone: boolean,
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    id: string,
    newTitle: string,
    todolistId: string
}


