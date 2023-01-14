import style from './todo-body.module.css';
import { useContext } from 'react';
import { TodoData } from '../../context/todo-context';
import { ProgresserIcon } from './todo-task-progresser/progressor';
import { StrikeText } from './strike-text/strike-text';
import { NewTodo } from './new-todo/new-todo';

export const TodoBody = () => {
    // Getting the todos data list using the  useContext hook
    const { todoData } = useContext(TodoData);

    return (<div className={style.appTitle}>
        <ol>
            {todoData.map(todo => {
                return (
                    <li key={todo.id} >
                        <StrikeText isCompleted={todo.completed} taskName={todo.name} todoId={todo.id} />.
                        <ProgresserIcon isCompleted={todo.completed} todoId={todo.id} />
                    </li>
                )
            })}
        </ol>
        <NewTodo />
    </div>)
}