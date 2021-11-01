import * as axios from 'axios';
import { TASK_MANAGEMENT_API } from "../config";

const createAuthorizationHeader = () => {
    const authToken = JSON.parse(localStorage.getItem('AuthObject'))
    console.log(authToken.bearerToken);
    const config = {
        headers: {
            'authorization': authToken.bearerToken
        }
    }
    return config;
}

const getToDo = async function() {
    const config = createAuthorizationHeader()
    try {
        const response = await axios.get(`${TASK_MANAGEMENT_API}/checklist/today`, config);
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
    const config = createAuthorizationHeader()
    const response = await axios.post(`${TASK_MANAGEMENT_API}/checklist`,
        {
            description,
            taskId,
            quantity,
            goalId,
            goalDescription
        }, config)
    return response.data;
}

const changeToDoCompletion = async function(id, completed, taskId) {
    const config = createAuthorizationHeader()
    const response = await axios.put(`${TASK_MANAGEMENT_API}/checklist/${id}/completed`,
        {
            completed,
            taskId
        },
        config)
    return response.status == 204;
}

const getCompletionHistory = async function(start, end) {

    try {
        const config = createAuthorizationHeader()
        const response = await axios.get(`${TASK_MANAGEMENT_API}/checklist/history/completed/summary?start=${start}&end=${end}`, config)
        let data = parseList(response)
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const adjustQuantity = async function(id, adjustment) {
    const config = createAuthorizationHeader()
    const response = await axios.post(`${TASK_MANAGEMENT_API}/checklist/quantity-adjustment`,
        {
            id,
            adjustment
        },
        config)
    return response.data;
}

const deleteToDo = async function(id) {
    const config = createAuthorizationHeader()
    const response = await axios.delete(`${TASK_MANAGEMENT_API}/checklist/${id}`, config);
    return response.status == 204;
}

const snoozeToDo = async function(id, days) {
    const config = createAuthorizationHeader()
    const response = await axios.post(`${TASK_MANAGEMENT_API}/checklist/${id}/snooze`,
        {
            days
        },
        config);
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
