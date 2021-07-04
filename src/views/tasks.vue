<template>
  <div class="row">
    <div class="tasks-container col-sm-12 col-lg-10 offset-lg-1">
      <div class="tasks-container-heading">Tasks</div>
      <div class="goal-selection">
        <label>Goal</label>
        <select v-model="selectedGoal" @change="onSelectedGoal">
          <option v-for="(goal) in goals" :value="goal.id" :key="goal.id">
            {{ goal.description }}
          </option>
        </select>
      </div>
      <div v-if = "!editMode" class="input-line bottom-margin-medium">
        <input v-model="newTask.description" @keypress="onAddItemEnter"/>
        <div class="check-box">
          <input type="checkbox" v-model="newTask.isOngoing"/>
          Ongoing
        </div>
        <div class="check-box">
          <input type="checkbox" v-model="newTask.isQuantifiable"/>
          Quantifiable
        </div>
        <button class="left-margin-small" @click="onAddItem" :disabled="isAddInvalid">Add</button>
      </div>
      <div v-if = "editMode" class="input-line bottom-margin-medium">
        <input v-model="editTask.description" @keypress="onEditItemEnter"/>
        <div class="check-box">
          <input type="checkbox" v-model="editTask.isOngoing"/>
          Ongoing
        </div>
        <div class="check-box">
          <input type="checkbox" v-model="editTask.isQuantifiable"/>
          Quantifiable
        </div>
        <button class="left-margin-small" @click="onEditItem" :disabled="isEditInvalid">Edit</button>
        <button class="left-margin-small" @click="onCancelEdit" >Cancel</button>
      </div>
      <div class="section">
        <div class="section-heading">Pending
        <div class="button-bar">
          <button :disabled="isNotActionable" @click="onAddToToDo">Add to To Do List</button>
          |
          <button :disabled="isNotActionable" @click="onDeleteItem">Delete</button>
        </div>
        </div>
        <div class="row">
          <div class="task col-sm-12 col-md-6" v-for="(task, index) in pendingTasks" :key="task.id">
            <div class="check-box">
              <input type="checkbox" v-model="task.selected">
            </div>
            <div :hidden="!task.isQuantifiable">
              <input class="quantity-input" placeholder="1" v-model="task.quantity" maxlength="3" size="3">
            </div>
            <div @click="onSelectForEdit(index)">{{ task.description }}</div>
            <div :hidden="!task.isOngoing" class="task-decoration">
              <font-awesome-icon icon="sync"/>
            </div>
            <div :hidden="!task.isQuantifiable" class="task-decoration">
              <font-awesome-icon icon="hashtag"/>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section-heading">In Progress</div>
        <div class="row">
          <div class="task col-sm-12 col-md-6" v-for="(task) in inProgressTasks" :key="task.id">
            {{ task.description }}
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section-heading">Completed</div>
        <div class="row">
          <div class="task col-sm-12 col-md-6" v-for="(task) in completedTasks" :key="task.id">
            {{ task.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {goalData, taskData, todoData} from "@/shared";

const EMPTY_TASK = {
  description: '',
  isOngoing: false,
  isQuantifiable: false,
}

export default {
  name: 'Tasks',
  components: {},
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
      editMode: false,
      editTask: {
        id: 0,
        description: '',
        isOngoing: false,
        isQuantifiable: false
      }
    }
  },
  async created() {
    await this.loadGoals();
  },
  methods: {
    async onAddItem() {
      let addedTask = await taskData.addTask(
          {
            goalId: this.selectedGoal,
            description: this.newTask.description,
            isOngoing: this.newTask.isOngoing,
            isQuantifiable: this.newTask.isQuantifiable
          });
      addedTask.quantity = 1;
      this.pendingTasks.push(addedTask);
      this.newTask.description = '';
      this.newTask.isQuantifiable = false;
      this.newTask.isOngoing = false;
    },
    onEditItemEnter(event) {
      if (event.keyCode == 13 && this.newTask != undefined && this.newTask.description.trim().length > 0) {
        this.onEditItem();
      }
    },
    onEditItem() {
      taskData.updateTask({
        id: this.editTask.id,
        description: this.editTask.description,
        isOngoing: this.editTask.isOngoing,
        isQuantifiable: this.editTask.isQuantifiable
      })
      const index = this.pendingTasks.findIndex(item => item.id == this.editTask.id)
      this.pendingTasks[index].description = this.editTask.description;
      this.pendingTasks[index].isOngoing = this.editTask.isOngoing;
      this.pendingTasks[index].isQuantifiable = this.editTask.isQuantifiable;
      this.editTask.id = 0;
      this.editTask.description = '';
      this.editTask.isQuantifiable = false;
      this.editTask.isOngoing = false;
      this.editMode = false;
    },
    onCancelEdit() {
      this.editTask.id = 0;
      this.editTask.description = '';
      this.editTask.isQuantifiable = false;
      this.editTask.isOngoing = false;
      this.editMode = false;
    },
    onSelectForEdit(index) {
      this.editMode = true;
      const task = this.pendingTasks[index];
      this.editTask.id = task.id;
      this.editTask.description = task.description;
      this.editTask.isOngoing = task.isOngoing;
      this.editTask.isQuantifiable = task.isQuantifiable;
    },
    onAddItemEnter(event) {
      if (event.keyCode == 13 && this.newTask != undefined && this.newTask.description.trim().length > 0) {
        this.onAddItem();
      }
    },
    onDeleteItem() {
      const tasksForRemoval = [];
      this.pendingTasks
          .filter(task => task.selected)
          .forEach((task, index) => {
            taskData.deleteTask(task.id);
            tasksForRemoval.push(index);
          });
      tasksForRemoval.reverse().forEach(index => this.pendingTasks.splice(index, 1));
      this.pendingTasks.forEach(task => task.selected = false);
    },
    onAddToToDo() {
      const tasksForRemoval = [];
      this.pendingTasks
          .filter(task => task.selected)
          .forEach((task, index) => {
            todoData.addToDo(task.description, task.id, task.quantity);
            task.status.key="IN_PROGRESS";
            tasksForRemoval.push(index);
            this.inProgressTasks.push(task);
          });
      tasksForRemoval.reverse().forEach(index => this.pendingTasks.splice(index, 1));
      this.pendingTasks.forEach(task => task.selected = false);
    },
    async loadGoals() {
      this.goals = await goalData.getGoals();
    },
    async onSelectedGoal() {
      console.log(this.selectedGoal)
      const tasks = await taskData.getTasks(this.selectedGoal);
      this.pendingTasks = tasks
          .filter(task => task.status.key === 'PENDING')
          .map(task => Object.assign({}, task, {selected: false, quantity: 1}));
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

.quantity-input {
  margin-right: 10px;
  width: 40px;
}

label {
  margin-right: 10px;
}

.input-line {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.check-box {
  margin-right: 5px;
  margin-left: 10px;
}

.button-bar {
  margin-left: 10px;
  button {
    padding-bottom: 0px;
    padding-top: 0px;
  }
}

.goal-selection {
  margin-bottom: 15px;
}

.task-decoration {
  margin-left: 5px;
  color: $primary-color-x-dark;
}

.task {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
    color: $primary-color;
  }
}


.tasks-container {
  @include container;
  text-align: left;
}

.tasks-container-heading {
  @include container-heading;
}
</style>
