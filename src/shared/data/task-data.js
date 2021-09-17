import * as axios from 'axios';
import {TASK_API} from '../config';

const getTasks = async function(goalId) {
    try {
        const response = await axios.get(`${TASK_API}/tasks/goal/${goalId}`);
        let data = parseList(response);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getTask = async function(taskId) {
    try {
        const response = await axios.get(`${TASK_API}/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        return undefined;
    }
}

/*
    Adds a task to the repository
    New tasks are formatted as follows:
    {
        goalId (numeric),
        description (string),
        isOngoing (boolean),
        isQuantifiable (boolean)
    }
 */
const addTask = async function(newTask) {
    const response = await axios.post(`${TASK_API}/tasks`, newTask);
    return response.data;
}

const deleteTask = async function(id) {
    const response = await axios.delete(`${TASK_API}/tasks/${id}`);
    return response.status = 204;
}

const updateTask = async function(updatedTask) {
    const response = await axios.put(`${TASK_API}/tasks/${updatedTask.id}`,
        {
            description: updatedTask.description,
            isOngoing: updatedTask.isOngoing,
            isQuantifiable: updatedTask.isQuantifiable,
            notes: updatedTask.notes
        })
    return response.status = 204;
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

export const TaskData = {
    getTasks,
    getTask,
    addTask,
    deleteTask,
    updateTask
}
