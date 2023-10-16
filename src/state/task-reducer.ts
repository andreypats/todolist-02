import {FilterValueType, TodolistsType} from "../App";
import {v1} from "uuid";


export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state

        default:
            throw new Error('I don\'t understand this type')
    }
}


// ActionCreators
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (todolistTitle: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: todolistTitle}
}
export const ChangeTodolistTitleAC = (todolistId: string, todolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: todolistTitle}
}
export const ChangeTodolistFilterAC = (todolistId: string, newFilter: FilterValueType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: newFilter}
}


// Types
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


