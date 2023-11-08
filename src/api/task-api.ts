import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a02b14da-2ef0-4b22-8bc0-8b0cfae88869',
    },
})

export const taskAPI = {

    getTask(todolistId: string) {
        const promise = instance.get<Array<TaskType>>(
            `todo-lists/${todolistId}/tasks`
        )
        return promise
    },

    createTask(todolistId: string, title: string) {
        const promise = instance.post<ResponseType>(
            `todo-lists/${todolistId}/tasks`,
            { title: title }
        )
        return promise
    },

    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`
        )
        return promise
    },

    updateTask(todolistId: string, taskId: string, title: string) {
        const promise = instance.put<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            { title: title }
        )
        return promise
    }
}

// Types
type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type ResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}



