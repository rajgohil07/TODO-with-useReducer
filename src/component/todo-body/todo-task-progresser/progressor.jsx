import { MdOutlineDone } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import style from './progressor.module.css'
import { useContext } from 'react';
import { TodoData } from '../../../context/todo-context';
import { todoOperationTypes } from "../../../types/todo-operation-type";

export const ProgresserIcon = ({ isCompleted, todoId }) => {
    const { alterTodo } = useContext(TodoData);

    return (
        isCompleted
            ? <RxCross1
                className={style.negativeProgressorIcon}
                title='Click to mark as incomplete'
                onClick={
                    () => alterTodo({ todoId, type: todoOperationTypes.TOGGLE_TASK_STATUS, value: false })
                } />
            : <MdOutlineDone
                className={style.postitiveProgressorIcon}
                title='Click to mark as complete'
                onClick={
                    () => alterTodo({ todoId, type: todoOperationTypes.TOGGLE_TASK_STATUS, value: true })
                } />
    )

}