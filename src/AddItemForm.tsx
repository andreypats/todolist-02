import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";

export const AddItemForm = (props: AddItemFormType) => {

    let [taskTitle, setTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTaskTitle = () => {
        if (taskTitle.trim() !== '') {
            props.addItem(taskTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskTitle()
        }
    }

    return (
        <div>
            <TextField variant='outlined'
                       value={taskTitle}
                       onChange={onChangeInputHandler}
                       onKeyDown={onKeyDownHandler}
                       error={!!error}
                       label= 'Title'
                       helperText={error}
            />
            <IconButton color='primary'
                        onClick={addTaskTitle}>
                <AddBox/>
            </IconButton>
        </div>
    );
};

type AddItemFormType = {
    addItem: (title: string) => void
}