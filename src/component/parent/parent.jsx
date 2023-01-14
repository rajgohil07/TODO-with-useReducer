import { useContext } from 'react';
import { TodoBody } from '../todo-body/todo-body';
import { TodoHeader } from '../todo-header/todo-header';
import style from './parent.module.css';
import { TodoData } from '../../context/todo-context';
import { Loader } from '../todo-body/loader/loader';

export const Parent = () => {
    const { isLoading } = useContext(TodoData)
    return (
        isLoading
            ? <Loader />
            : <div className={style.parentDiv}>
                <TodoHeader />
                <TodoBody />
            </div >
    )
}