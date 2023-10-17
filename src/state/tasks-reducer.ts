import {FilterValueType, TasksStateType} from "../App";
import {v1} from "uuid";


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




        /*
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            let changedTitleTodolist = state.find(todolist => todolist.id === action.id)
            if (changedTitleTodolist) {
                if (action.title != null) {
                    changedTitleTodolist.title = action.title
                }
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            let changedFilterTodolist = state.find(todolist => todolist.id === action.id)
            if (changedFilterTodolist) {
                if (action.filter != null) {
                    changedFilterTodolist.filter = action.filter
                }
            }
            return [...state]
         */

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

/*
export const AddTodolistAC = (todolistTitle: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: todolistTitle}
}
export const ChangeTodolistTitleAC = (todolistId: string, todolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: todolistTitle}
}
export const ChangeTodolistFilterAC = (todolistId: string, newFilter: FilterValueType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: newFilter}
}
*/

// Types
type ActionType =
    RemoveTaskActionType
    | AddTaskActionType

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

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValueType
}


