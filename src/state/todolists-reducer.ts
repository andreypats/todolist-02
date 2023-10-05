import {FilterValueType, TodolistsType} from "../App";
import {v1} from "uuid";


export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter((todolist) => todolist.id !== action.id)]
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            let changedTodolist = state.find(todolist => todolist.id === action.id)
            if (changedTodolist) {
                if (action.title != null) {
                    changedTodolist.title = action.title
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
        default:
            throw new Error('I don\'t understand this type')
    }
}


type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
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


