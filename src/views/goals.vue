<template>
  <div class="row">
  <div class="goals-container col-sm-12 col-lg-10 offset-lg-1">
    <div class="goals-container-heading">Goals</div>
    <input class="bottom-margin-medium" v-model="newItem" @keypress="onAddItemEnter"/>
    <button class="left-margin-small" @click="onAddItem" :disabled="isAddInvalid">Add</button>
    <div class="row">
    <div class="todo-item col-sm-12 col-md-6" v-for="(goal, index) in goals" :key="goal.id">
      {{ goal.description }}
      <button class="left-margin-small" @click="onDeleteItem(index)">Delete</button>
    </div>
      </div>
  </div>
  </div>
</template>

<script>
import { GoalData } from "@/shared/data/goal-data";

export default {
  name: 'Goals',
  components: {

  },
  computed: {
    isAddInvalid() {
      return this.newItem == undefined || this.newItem.trim().length == 0;
    }
  },
  data() {
    return {
      newItem: '',
      goals: []
    }
  },
  async created() {
    await this.loadGoals();
  },
  methods: {
    async onAddItem() {
      let addedGoal = await GoalData.addGoal(this.newItem);
      this.goals.push(addedGoal);
      this.newItem = '';
    },
    onAddItemEnter(event) {
      if (event.keyCode == 13 && this.newItem != undefined && this.newItem.trim().length > 0) {
        this.onAddItem();
      }
    },
    async onDeleteItem(index) {
      await GoalData.deleteGoal(this.goals[index].id);
      this.goals.splice(index, 1);
    },
    async loadGoals() {
      this.goals = await GoalData.getGoals();
    }
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme';

.goals-container {
  @include container;
  text-align: left;
}

.goals-container-heading {
  @include container-heading;
}
</style>
