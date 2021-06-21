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
      <div class="button-bar">
        <button>Add to To Do List</button>
        <button>Delete</button>
      </div>
      <input class="bottom-margin-medium" v-model="newItem" @keypress="onAddItemEnter"/>
      <button class="left-margin-small" @click="onAddItem" :disabled="isAddInvalid">Add</button>
      <div class="row">
        <div class="todo-item col-sm-12 col-md-6" v-for="(task) in tasks" :key="task.id">
          <input type="checkbox" v-model="task.selected">
          {{ task.description }}
          <!-- <button class="left-margin-small" @click="onDeleteItem(index)">Delete</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { goalData } from "@/shared/goal-data";
import { taskData } from "@/shared/task-data";

export default {
  name: 'Tasks',
  components: {},
  computed: {
    isAddInvalid() {
      return this.newItem == undefined || this.newItem.trim().length == 0;
    }
  },
  data() {
    return {
      newItem: '',
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
      let addedTask = await taskData.addTask(this.selectedGoal, this.newItem);
      this.tasks.push(addedTask);
      this.newItem = '';
    },
    onAddItemEnter(event) {
      if (event.keyCode == 13 && this.newItem != undefined && this.newItem.trim().length > 0) {
        this.onAddItem();
      }
    },
    onDeleteItem(index) {
      this.goals.splice(index, 1);
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
