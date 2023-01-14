import { useContext, useEffect, useRef, useState } from 'react';
import style from './new-todo.module.css';
import { MdOutlineDone } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { TodoData } from '../../../context/todo-context';
import { todoOperationTypes } from '../../../types/todo-operation-type';

export const NewTodo = () => {
    // Get the function to alter the data of the todo
    const { alterTodo } = useContext(TodoData);

    // to toggle between add mode on and off.
    const [isAddModeOn, changeAddMode] = useState(false);

    // Created the ref hook for the focus and to get the value
    const textValueFocus = useRef();

    // to check for the validation of the name newly added todo.
    const [isValidTodoName, changeIsValidTodoName] = useState(true);

    // Enable the focus when add mode is on.
    useEffect(() => {
        if (isAddModeOn) {
            textValueFocus.current.focus();
        }
    }, [isAddModeOn])


    // Call the alter function to add new todo to the todo data list
    const addNewTodo = () => {
        const newTodoName = textValueFocus.current.value;
        if (newTodoName) {
            alterTodo({ name: newTodoName, type: todoOperationTypes.NEW_TODO_ADDED });
            changeIsValidTodoName(true);
            changeAddMode(false);
        } else {
            changeIsValidTodoName(false);
        }
    }

    return (
        isAddModeOn
            ? <div className={style.editInput}>
                <input
                    ref={textValueFocus}
                    type="text"
                    placeholder='Please add your todo'
                    onChange={(e) => e.target.value ? changeIsValidTodoName(true) : changeIsValidTodoName(false)} />
                <RxCross1
                    className={style.negativeProgressorIcon}
                    title='Click to close this action'
                    onClick={() => { changeAddMode(false); changeIsValidTodoName(true) }} />
                <MdOutlineDone
                    className={style.postitiveProgressorIcon}
                    title='Click to create new todo'
                    onClick={() => addNewTodo()}
                />
                <p className={style.errorMessage}>{isValidTodoName ? '' : 'Please enter valid todo name.'}</p>
            </div>
            : <button className={style.styledButton} onClick={() => changeAddMode(true)}>Add todo</button>
    )
}