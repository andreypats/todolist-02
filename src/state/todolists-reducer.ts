import {TodolistsType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    id?: string
    title?: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((todolist) => todolist.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        default:
            throw new Error('I don\'t understand this type')
    }
}


