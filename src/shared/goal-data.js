import * as axios from 'axios';
import { GOAL_API} from "@/shared/config";

const getGoals = async function() {
    try {
        const response = await axios.get(`${GOAL_API}/goals`)
        let data = parseList(response);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const addGoal = async function(description) {
    const response = await axios.post(`${GOAL_API}/goals`,
        {
            description
        })
    return response.data;
}

const deleteGoal = async function(id) {
    const response = await axios.delete(`${GOAL_API}/goals/${id}`);
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

export const goalData = {
    getGoals,
    addGoal,
    deleteGoal
}
