import * as axios from 'axios';
import {TASK_API} from './config';

const getTasks = async function(goalId) {
    try {
        const response = await axios.get(`${TASK_API}/tasks/${goalId}`);
        let data = parseList(response);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

/*
    Adds a task to the repository
    New tasks are formatted as follows:
    {
        goalId (numeric),
        description (string),
        isOngoing (boolean)
    }
 */
const addTask = async function(newTask) {
    const response = await axios.post(`${TASK_API}/tasks`, newTask)
    return response.data;
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

export const taskData = {
    getTasks,
    addTask
}
