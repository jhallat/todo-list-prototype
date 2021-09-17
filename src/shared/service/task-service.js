import {ScheduleData, GoalData, TaskData } from "@/shared";

class TaskService {

    async getTask(id) {
        let task = await TaskData.getTask(id);
        const goal = await GoalData.getGoal(task.goalId);
        task = { ...task,
                 goalDescription: goal.description }
        const schedule = await ScheduleData.getTaskSchedule(id)
        task = { ...task,
                 schedule }
        console.log(task);
        return task;
    }

    async updateTask(task) {
        await TaskData.updateTask(task)
        task.schedule.taskId = task.id;
        task.schedule.description = task.description;
        task.schedule.quantfifable = task.quantfifable;
        task.schedule.goalId = task.goalId;
        task.schedule.goalDescription = task.goalDescription;
        if (task.schedule && task.schedule.weekly) {
            task.schedule.weekly.sunday = parseInt(task.schedule.weekly.sunday)
            task.schedule.weekly.monday = parseInt(task.schedule.weekly.monday)
            task.schedule.weekly.tuesday = parseInt(task.schedule.weekly.tuesday)
            task.schedule.weekly.wednesday = parseInt(task.schedule.weekly.wednesday)
            task.schedule.weekly.thursday = parseInt(task.schedule.weekly.thursday)
            task.schedule.weekly.friday = parseInt(task.schedule.weekly.friday)
            task.schedule.weekly.saturday = parseInt(task.schedule.weekly.saturday)
        }
        await ScheduleData.updateTaskSchedule(task.id, task.schedule);
    }

}

const taskService = new TaskService();

export const TaskServiceFactory = {
    getInstance: () => {
        return taskService;
    }
}
