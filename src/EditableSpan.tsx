import React, {ChangeEvent, useState} from 'react';

export const EditableSpan = (props: EditableSpanType) => {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.title);

    const activateEditMode = () => {
        setEditMode (true);
        setTitle(props.title)
    };

    const activateViewMode = () => {
        setEditMode (false);
        props.onChange(title)
    };

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return editMode
        ? <input
            type="text"
            value={title}
            onBlur={activateViewMode}
            onChange={onChangeInputHandler}
            autoFocus
        />
        : <span onDoubleClick={activateEditMode}>{title}</span>

};

type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void
}