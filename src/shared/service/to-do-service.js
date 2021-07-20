import {ToDoData} from "@/shared/data";

class ToDoService {
    goals = [];

    groupItemsToGoals(items) {
        this.goals.push({ id: 0, description: 'Unassigned', items: []});
        items.forEach(item => {
            if (item.goalId === undefined || parseInt(item.goalId) === 0) {
                this.goals[0].items.push(item)
            } else {
                const goal = this.goals.find(g => g.id === item.goalId);
                if (goal === undefined) {
                    this.goals.push({id: item.goalId, description: item.goalDescription, items: [item]});
                } else {
                    goal.items.push(item);
                }
            }
        });
        return this.goals;
    }

    async refresh() {
        this.goals.splice(0, this.goals.length);
        const toDoItems = await ToDoData.getToDo();
        this.groupItemsToGoals(toDoItems);
    }

    async getToDoListForToday() {
        if (this.goals.length === 0) {
            await this.refresh()
        }
        return this.goals;
    }

    async addToDo(todo) {
        return await ToDoData.addToDo(todo);
    }

    async deleteToDo(id) {
        return await ToDoData.deleteToDo(id);
    }

    async snoozeToDo(id, days) {
        return await ToDoData.snoozeToDo(id, days);
    }

    async adjustQuantity(id, adjustment) {
        return await ToDoData.adjustQuantity(id, adjustment);
    }
}

export const ToDoServiceFactory ={
   createInstance: () => {
       return new ToDoService();
   }
}
