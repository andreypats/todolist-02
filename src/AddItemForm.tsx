import React, {ChangeEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

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
            <Button
                variant='contained'
                color='primary'
                style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                onClick={addTaskTitle}
            >+</Button>
        </div>
    );
};

type AddItemFormType = {
    addItem: (title: string) => void
}