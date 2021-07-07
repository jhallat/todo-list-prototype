import * as axios from 'axios';
import { SCHEDULE_API } from './config';

const getSchedules = async function() {
    try {
        const response = await axios.get(`${SCHEDULE_API}/schedules`)
        let data = parseList(response);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
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

export const scheduleData = {
    getSchedules
}
