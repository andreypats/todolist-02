import {TodolistsType} from "../App";

type ActionType = {
    type: string
    id: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((todolist) => todolist.id !== action.id)
        default:
            throw new Error('I don\'t understand this type')
    }
}


