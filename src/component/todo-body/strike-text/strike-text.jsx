import { useContext } from 'react';
import { todoOperationTypes } from '../../../types/todo-operation-type';
import { TodoData } from '../../../context/todo-context';
import style from "./strike-text.module.css";

export const StrikeText = ({ isCompleted, taskName, todoId }) => {
    const { alterTodo } = useContext(TodoData)

    return isCompleted
        ? <s title='Click to mark as incomplete'
            className={style.cursorChanger}
            onClick={() => { alterTodo({ todoId, type: todoOperationTypes.TOGGLE_TASK_STATUS, value: false }) }}>
            {taskName}
        </s>
        : <span title='Click to mark as complete'
            className={style.cursorChanger}
            onClick={() => { alterTodo({ todoId, type: todoOperationTypes.TOGGLE_TASK_STATUS, value: true }) }}>
            {taskName}
        </span>
}