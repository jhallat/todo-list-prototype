import * as axios from 'axios';
import { API } from './config';

const getToDo = async function() {
    try {
        const response = await axios.get(`${API}/api/todo`);
        let data = parseList(response);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const addToDo = async function(description) {
    const response = await axios.post(`${API}/api/todo`,
        {
            description
        })
    console.log(response.data);
    return response.data;
}

const changeToDoCompletion = async function(id, completed) {
    const response = await axios.put(`${API}/api/todo/${id}/completed`,
        {
            completed
        })
    return response.status == 204;
}

const deleteToDo = async function(id) {
    const response = await axios.delete(`${API}/api/todo/${id}`);
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
