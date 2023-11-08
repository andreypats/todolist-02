import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'a02b14da-2ef0-4b22-8bc0-8b0cfae88869',
    },
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put(
            `todo-lists/${todolistId}`,
            { title: title }
        )
        return promise
    },

    createTodolist(title: string) {
        const promise = instance.post(
            `todo-lists`,
            { title: title }
        )
        return promise
    },

    getTodolists() {
        const promise = instance.get<Array<TodolistType>>(
            `todo-lists`
        )
        return promise
    },

    deleteTodolist(todolistId: string) {
        const promise = instance.delete(
            `todo-lists/${todolistId}`
        )
        return promise
    }
}

// Types
type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}