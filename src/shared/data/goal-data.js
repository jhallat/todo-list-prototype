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

const getGoals = async function() {
    const config = createAuthorizationHeader();
    try {
        const response = await axios.get(`${TASK_MANAGEMENT_API}/goals`, config)
        let data = parseList(response);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getGoal = async function(id) {
    const config = createAuthorizationHeader();
    try {
        const response = await axios.get(`${TASK_MANAGEMENT_API}/goals/${id}`, config);
        return response.data;
    } catch (error) {
        return undefined;
    }
}

const addGoal = async function(description) {
    const config = createAuthorizationHeader();
    const response = await axios.post(`${TASK_MANAGEMENT_API}/goals`,
        {
            description
        }, config)
    return response.data;
}

const deleteGoal = async function(id) {
    const config = createAuthorizationHeader();
    const response = await axios.delete(`${TASK_MANAGEMENT_API}/goals/${id}`, config);
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

export const GoalData = {
    getGoals,
    addGoal,
    deleteGoal,
    getGoal
}
