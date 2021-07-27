import { TaskData } from "@/shared/data";
import {ScheduleData} from "@/shared";

class TaskService {

    async getTask(id) {
        let task = await TaskData.getTask(id);
        const weeklyTask = await ScheduleData.getWeeklyTask(id)
        if (weeklyTask != null) {
            task = { ...task,
                     scheduleModified: false,
                     scheduleType: 'weekly',
                     weeklySchedule: weeklyTask}
        } else {
            const weeklySchedule = {
                paused: false,
                sunday: 0,
                monday: 0,
                tuesday:0,
                wednesday: 0,
                thursday: 0,
                friday: 0,
                saturday: 0
            }
            task = { ...task,
                scheduleModified: false,
                scheduleType: 'none',
                weeklySchedule}
        }
        return task;
    }

    //TODO should keep track if schedule has changed
    async updateTask(task) {
        await TaskData.updateTask(task)
        if (task.scheduleModified) {
            await ScheduleData.updateWeeklyTask(task.id, task.weeklySchedule);
        }
    }

}

const taskService = new TaskService();

export const TaskServiceFactory = {
    getInstance: () => {
        return taskService;
    }
}
