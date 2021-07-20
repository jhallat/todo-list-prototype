import * as axios from 'axios';
import { TODO_API } from '../config';

const getToDo = async function() {
    try {
        const response = await axios.get(`${TODO_API}/todo/today`);
        let data = parseList(response);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const addToDo = async function(description,
                               taskId = 0,
                               quantity = 1,
                               goalId = 0,
                               goalDescription = '') {
    const response = await axios.post(`${TODO_API}/todo`,
        {
            description,
            taskId,
            quantity,
            goalId,
            goalDescription
        })
    return response.data;
}

const changeToDoCompletion = async function(id, completed, taskId) {
    const response = await axios.put(`${TODO_API}/todo/${id}/completed`,
        {
            completed,
            taskId
        })
    return response.status == 204;
}

const getCompletionHistory = async function(start, end) {

    try {
        const response = await axios.get(`${TODO_API}/todo/history/completed/summary?start=${start}&end=${end}`)
        let data = parseList(response)
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const adjustQuantity = async function(id, adjustment) {
    const response = await axios.post(`${TODO_API}/todo/quantity-adjustment`,
        {
            id,
            adjustment
        })
    return response.data;
}

const deleteToDo = async function(id) {
    const response = await axios.delete(`${TODO_API}/todo/${id}`);
    return response.status == 204;
}

const snoozeToDo = async function(id, days) {
    const response = await axios.post(`${TODO_API}/todo/${id}/snooze`,
        {
            days
        });
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


export const ToDoData = {
    getToDo,
    addToDo,
    changeToDoCompletion,
    deleteToDo,
    adjustQuantity,
    snoozeToDo,
    getCompletionHistory
}
