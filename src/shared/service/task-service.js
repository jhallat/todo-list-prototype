import { TaskData } from "@/shared/data";
import {scheduleData} from "@/shared";

class TaskService {

    async getTask(id) {
        let task = await TaskData.getTask(id);
        const weeklyTask = await scheduleData.getWeeklyTask(id)
        if (weeklyTask != null) {
            task = Object.assign({}, task, {scheduleType: 'weekly', weeklySchedule: weeklyTask})
        } else {
            const weeklySchedule = {
                sunday: 0,
                monday: 0,
                tuesday:0,
                wednesday: 0,
                thursday: 0,
                friday: 0,
                saturday: 0
            }
            task = Object.assign({}, task, {scheduleType: 'none', weeklySchedule})
        }
        return task;
    }

}

const taskService = new TaskService();

export const TaskServiceFactory = {
    getInstance: () => {
        return taskService;
    }
}
