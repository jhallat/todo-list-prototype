<template>
  <div class="row">
    <div class="tasks-container col-sm-12 col-lg-10 offset-lg-1">
      <div class="tasks-container-heading">Tasks</div>

      <!-- Select a goal -->
      <div class="goal-selection">
        <label class="margin-right-small">Goal</label>
        <select v-model="selectedGoal" @change="onSelectedGoal">
          <option v-for="(goal) in goals" :value="goal.id" :key="goal.id">
            {{ goal.description }}
          </option>
        </select>
      </div>

      <!-- Add or Edit a task -->
      <TaskEdit :task="editTask" :edit-mode="editMode"
                @cancel="onCancelEdit"
                @add="onAddItem($event)"
                @edit="onEditItem($event)"></TaskEdit>

      <!-- Pending items section -->
      <ListSection heading="Pending">
        <div class="col-sm-12 col-md-6" v-for="(task, index) in pendingTasks" :key="task.id">
          <TaskItem :task="task" @delete="onDeleteItem(index)"
                    @edit="onSelectForEdit(index)"
                    @start="onStart(index, $event)"
                    @schedule="onSchedule(index)"></TaskItem>
        </div>
      </ListSection>

      <!-- In progress section -->
      <ListSection heading="In Progress">
          <div class="task col-sm-12 col-md-6" v-for="(task) in inProgressTasks" :key="task.id">
            {{ task.description }}
          </div>
      </ListSection>

      <!-- Completed section -->
      <ListSection heading="Completed">
          <div class="task col-sm-12 col-md-6" v-for="(task) in completedTasks" :key="task.id">
            {{ task.description }}
          </div>
      </ListSection>

    </div>
    <div v-if="displayScheduleDialog">
      <ScheduleDialog :schedules="schedules" @dialogOk="onScheduleSelect" @dialogCancel="onScheduleCancel"></ScheduleDialog>
    </div>
  </div>
</template>

<script>
import {goalData, taskData, todoData, scheduleData} from "@/shared";
import ScheduleDialog from "@/components/schedule-dialog";
import TaskItem from "@/components/task-item";
import TaskEdit from "@/components/task-edit";
import ListSection from "@/components/list-section";

const EMPTY_TASK = {
  description: '',
  isOngoing: false,
  isQuantifiable: false,
}

export default {
  name: 'Tasks',
  components: {ListSection, TaskEdit, TaskItem, ScheduleDialog},
  computed: {
    isAddInvalid() {
      return this.newTask === undefined || this.newTask.description.trim().length === 0;
    },
    isEditInvalid() {
      return this.editTask === undefined || this.editTask.description.trim().length === 0;
    },
    isNotActionable() {
      if (this.pendingTasks.some(task => task.selected)) {
        return false;
      }
      return true;
    }
  },
  data() {
    return {
      newTask: EMPTY_TASK,
      selectedGoal: 0,
      goals: [],
      pendingTasks: [],
      inProgressTasks: [],
      completedTasks: [],
      schedules: [],
      editMode: 'add',
      editTask: {
        id: 0,
        description: '',
        isOngoing: false,
        isQuantifiable: false
      },
      displayScheduleDialog: false,
      taskToSchedule: EMPTY_TASK
    }
  },
  async created() {
    await this.loadGoals();
  },
  methods: {
    async onSchedule(index) {
      this.schedules = await scheduleData.getSchedules();
      this.displayScheduleDialog = true;
      this.taskToSchedule = this.pendingTasks[index]
    },
    onScheduleSelect(scheduleId) {
      const task = this.taskToSchedule;
      scheduleData.addTask(scheduleId, task.id, task.description,  parseInt(task.quantity));
      this.displayScheduleDialog = false;
      this.taskToSchedule = EMPTY_TASK;
    },
    onScheduleCancel() {
      this.displayScheduleDialog = false;
    },
    async onAddItem(task) {
      let addedTask = await taskData.addTask(
          {
            goalId: this.selectedGoal,
            description: task.description,
            isOngoing: task.isOngoing,
            isQuantifiable: task.isQuantifiable
          });
      task.quantity = 1;
      this.pendingTasks.push(addedTask);
      this.editTask.description = '';
      this.editTask.isQuantifiable = false;
      this.editTask.isOngoing = false;
    },
    onEditItem(task) {
      taskData.updateTask({
        id: task.id,
        description: task.description,
        isOngoing: task.isOngoing,
        isQuantifiable: task.isQuantifiable
      })
      const index = this.pendingTasks.findIndex(item => item.id == task.id)
      this.pendingTasks[index].description = this.editTask.description;
      this.pendingTasks[index].isOngoing = this.editTask.isOngoing;
      this.pendingTasks[index].isQuantifiable = this.editTask.isQuantifiable;
      this.editTask.id = 0;
      this.editTask.description = '';
      this.editTask.isQuantifiable = false;
      this.editTask.isOngoing = false;
      this.editMode = 'add';
    },
    onCancelEdit() {
      this.editTask.id = 0;
      this.editTask.description = '';
      this.editTask.isQuantifiable = false;
      this.editTask.isOngoing = false;
      this.editMode = 'add';
    },
    onSelectForEdit(index) {
      this.editMode = 'edit';
      const task = this.pendingTasks[index];
      this.editTask.id = task.id;
      this.editTask.description = task.description;
      this.editTask.isOngoing = task.isOngoing;
      this.editTask.isQuantifiable = task.isQuantifiable;
      console.log(this.editMode);
    },
    onDeleteItem(index) {
      const id = this.pendingTasks[index].id;
      taskData.deleteTask(id);
      this.pendingTasks.splice(index, 1);
    },
    onStart(index, quantity) {
      const task = this.pendingTasks[index]
      todoData.addToDo(task.description, task.id, quantity);
      task.status.key="IN_PROGRESS";
      this.inProgressTasks.push(task);
      this.pendingTasks.splice(index, 1);
    },
    async loadGoals() {
      this.goals = await goalData.getGoals();
    },
    async onSelectedGoal() {
      const tasks = await taskData.getTasks(this.selectedGoal);
      this.pendingTasks = tasks
          .filter(task => task.status.key === 'PENDING');
      this.inProgressTasks = tasks
          .filter(task => task.status.key === 'IN_PROGRESS');
      this.completedTasks = tasks
          .filter(task => task.status.key === 'COMPLETED');
    }
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme';

.section {
  clear: both;
  display: block;
  padding-bottom: 10px;
}

.section-heading {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 20px;
  margin-bottom: 15px;
  border-bottom: 1px solid $primary-color-dark;
  color: $primary-color-dark;
}


.goal-selection {
  margin-bottom: 15px;
}


.tasks-container {
  @include container;
  text-align: left;
}

.tasks-container-heading {
  @include container-heading;
}
</style>
