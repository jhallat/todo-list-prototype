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
      <div class="input-line bottom-margin-medium">
        <input v-model="newTask.description" @keypress="onAddItemEnter"/>
        <div class="check-box">
          <input type="checkbox" v-model="newTask.isOngoing"/>
          Ongoing
        </div>
        <button class="left-margin-small" @click="onAddItem" :disabled="isAddInvalid">Add</button>
      </div>
      <div class="button-bar">
        <button :disabled="isNotActionable" @click="onAddToToDo">Add to To Do List</button>
        |
        <button :disabled="isNotActionable">Delete</button>
      </div>
      <div class="row">
        <div class="task col-sm-12 col-md-6" v-for="(task) in tasks" :key="task.id">
          <div class="check-box">
            <input type="checkbox" v-model="task.selected">
          </div>
          {{ task.description }}
          <div :hidden="!task.isOngoing" class="task-decoration">
            <font-awesome-icon icon="sync"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {goalData, taskData, todoData} from "@/shared";

export default {
  name: 'Tasks',
  components: {},
  computed: {
    isAddInvalid() {
      return this.newTask === undefined || this.newTask.description.trim().length === 0;
    },
    isNotActionable() {
      if (this.tasks.some(task => task.selected)) {
        return false;
      }
      return true;
    }
  },
  data() {
    return {
      newTask: {
        description: '',
        isOngoing: false
      },
      selectedGoal: 0,
      goals: [],
      tasks: []
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
            isOngoing: this.newTask.isOngoing
          });
      this.tasks.push(addedTask);
      this.newItem = '';
    },
    onAddItemEnter(event) {
      if (event.keyCode == 13 && this.newTask != undefined && this.newTask.description.trim().length > 0) {
        this.onAddItem();
      }
    },
    onDeleteItem(index) {
      this.goals.splice(index, 1);
    },
    onAddToToDo() {
      this.tasks
          .filter(task => task.selected)
          .forEach(task => todoData.addToDo(task.description, task.id));
      this.tasks.forEach(task => task.selected = false);
    },
    async loadGoals() {
      this.goals = await goalData.getGoals();
    },
    async onSelectedGoal() {
      console.log(this.selectedGoal)
      const tasks = await taskData.getTasks(this.selectedGoal);
      this.tasks = tasks.map(task => Object.assign({}, task, {selected: false}));
    }
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme';

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
  margin-top: 5px;
  margin-bottom: 5px;
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
}


.tasks-container {
  @include container;
  text-align: left;
}

.tasks-container-heading {
  @include container-heading;
}
</style>
