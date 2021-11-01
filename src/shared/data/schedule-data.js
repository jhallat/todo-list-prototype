import * as axios from 'axios';
import { SCHEDULE_API } from '../config';

const getSchedules = async function(start, end) {
    try {
        const response = await axios.get(`${SCHEDULE_API}/schedule/range?start=${start}&end=${end}`)
        let data = parseList(response);
        return data;

    } catch (error) {
        console.error(error);
        return [];
    }
}

const getTasks = async function(scheduleId) {
    try {
        const response = await axios.get(`${SCHEDULE_API}/scheduled-task/${scheduleId}`)
        return parseList(response);
    } catch (error) {
        console.error(error);
        return [];
    }
}

const addSchedule = async function(schedule) {
    try {
        const response = await axios.post(`${SCHEDULE_API}/schedules`,
            {
                id: 0,
                description: schedule.description,
                selectedDays: schedule.selectedDays
            })
        return response.data
    } catch (error) {
        console.error(error);
        return null;
    }
}

const addTask = async function(scheduleId, taskId, taskDescription, taskQuantity) {
    try {
        const response = await axios.post(`${SCHEDULE_API}/scheduled-task`,
            {
                scheduleId,
                taskId,
                taskDescription,
                taskQuantity
            })
        return response.status = 201;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const getTaskSchedule = async function(taskId) {
    try {
        const response = await axios.get(`${SCHEDULE_API}/schedule/${taskId}`)
        return response.data
    } catch (error) {
        console.error(error);
        return null;
    }
}

const updateTaskSchedule = async function(taskId, schedule) {
    console.log(JSON.stringify(schedule));
    const response = await axios.put(`${SCHEDULE_API}/schedule/${taskId}`, schedule)
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

export const ScheduleData = {
    getSchedules,
    addSchedule,
    addTask,
    getTasks,
    getTaskSchedule,
    updateTaskSchedule
}
