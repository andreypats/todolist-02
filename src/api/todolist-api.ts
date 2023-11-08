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

    getTodolists() {
        const promise = instance.get<Array<TodolistType>>(
            `todo-lists`
        )
        return promise
    },

    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{item: TodolistType}>>(
            `todo-lists`,
            { title: title }
        )
        return promise
    },

    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType<{}>>(
            `todo-lists/${todolistId}`
        )
        return promise
    },

    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType<{}>>(
            `todo-lists/${todolistId}`,
            { title: title }
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

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}



