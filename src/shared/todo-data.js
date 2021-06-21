import * as axios from 'axios';
import { TODO_API } from './config';

const getToDo = async function() {
    try {
        const response = await axios.get(`${TODO_API}/api/todo/today`);
        let data = parseList(response);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const addToDo = async function(description) {
    const response = await axios.post(`${TODO_API}/api/todo`,
        {
            description
        })
    return response.data;
}

const changeToDoCompletion = async function(id, completed) {
    const response = await axios.put(`${TODO_API}/api/todo/${id}/completed`,
        {
            completed
        })
    return response.status == 204;
}

const deleteToDo = async function(id) {
    const response = await axios.delete(`${TODO_API}/api/todo/${id}`);
    return response.status == 204;
}

const parseList = response => {
    if (response.status != 200) throw Error(response.message);
    if (!response.data) return [];
    let list = response.data;
    if (typeof list != 'object') {
        list = [];
    }
    return list;
}


export const todoData = {
    getToDo,
    addToDo,
    changeToDoCompletion,
    deleteToDo
}
