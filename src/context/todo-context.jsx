import axios from 'axios';
import { createContext, useEffect, useReducer, useState } from "react";
import { todoOperationTypes } from '../types/todo-operation-type'

// Create the context for the todo data list 
export const TodoData = createContext();

// Todo context component
export const TodoXContext = ({ children }) => {

    // Toggle the task status based on the provided id
    const toggleTheTaskById = (todoStateData, todoId, value) => {
        const mockedTodoData = [...todoStateData];
        mockedTodoData.forEach(todo => {
            if (todo.id === todoId) {
                todo.completed = value;
            }
        })
        // return the updated todo data list state
        return mockedTodoData
    }

    // To add the new todo to or list
    const addNewTodo = (todoStateData, name) => {
        const mockedTodoData = [...todoStateData];
        const newTodoObj = {
            id: new Date().getTime(),
            name,
            completed: false
        };
        // return the newly added todo data list state
        mockedTodoData.push(newTodoObj);
        return mockedTodoData;
    }

    // Function for the todos reducer
    const todoReducerFunction = (todoStateData, objData) => {
        switch (objData.type) {
            // When fetching the todo record list using the axios 
            case todoOperationTypes.TODO_FETCHED: {
                return objData.TodoDataList;
            }
            // Toggle the task status based on the provided id
            case todoOperationTypes.TOGGLE_TASK_STATUS: {
                return toggleTheTaskById(todoStateData, objData.todoId, objData.value);
            }
            // To add the new todo to or list
            case todoOperationTypes.NEW_TODO_ADDED: {
                return addNewTodo(todoStateData, objData.name);
            }
            // if no type has match then simply return the provided todo state data. 
            default: {
                console.error('No valid action has been provided');
                return todoStateData;
            }
        }
    }

    // Setting the loader to display the DNA effect when fetch the API.
    const [isLoading, setLoaderValue] = useState(true);

    // using the reducer to manage state for the todo data list
    const [todoDataList, alterDataList] = useReducer(todoReducerFunction, [])

    // used the website to fetch the data ref: https://dummyjson.com/docs/todos
    const fetch5TodoDataList = async () => {
        // axios request config ref: https://axios-http.com/docs/req_config
        const axiosConfig = {
            url: '/todos',
            method: 'get',
            baseURL: 'https://dummyjson.com',
            params: {
                limit: 5
            }
        }
        // Get the required todos data list only from the response
        const {
            data: {
                todos: todoData
            }
        } = await axios(axiosConfig);
        const modifiedData = todoData.map((todo, index) => (
            {
                id: new Date().getTime() + index,
                name: todo.todo,
                completed: todo.completed
            }
        ));
        // Calling the reducer function from the useReducer
        alterDataList({ TodoDataList: modifiedData, type: todoOperationTypes.TODO_FETCHED });
        // Setting the value of loader to false
        setLoaderValue(false);
    }


    useEffect(() => {
        setTimeout(() =>
            // Fetch the data from the server
            (async () => await fetch5TodoDataList())(), 1100)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        // Providing the todo data and its alter function
        <TodoData.Provider value={{ todoData: todoDataList, alterTodo: alterDataList, isLoading, setLoaderValue }}>
            {children}
        </TodoData.Provider>
    )
}