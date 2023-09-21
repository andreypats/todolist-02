import React, {ChangeEvent, useState} from 'react';
import {Button} from "@mui/material";

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
            <input value={taskTitle}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? 'error' : ''}
            />
            <Button
                variant = 'contained'
                color = 'primary'
                style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                onClick={addTaskTitle}
            >+</Button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

type AddItemFormType = {
    addItem: (title: string) => void
}