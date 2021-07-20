<template>
  <div>
    <div class="row">
      <div class="todo-list-container col-sm-12 col-lg-10 offset-lg-1">
        <div class="todo-list-container-heading">
          <div class="todo-list-container-heading-title">To Do List</div>
          <div class="button-bar">
            <button class="tdl-button" @click="refresh">Refresh</button>
          </div>
          <div class="left-margin-small">
            <CheckBox :selected="hideCompleted" label="Hide completed items" @select="toggleHideCompleted($event)"></CheckBox>
          </div>
        </div>
        <input class="bottom-margin-medium tdl-input" v-model="newItem" @keypress="onAddItemEnter"/>
        <button class="left-margin-small tdl-button" @click="onAddItem" :disabled="isAddInvalid">Add</button>
        <div class="tdl-list" v-for="goal in filteredGoals" :key="goal.id">
          <Group :heading="goal.description">
            <div class="col-sm-12 col-md-6" v-for="(item) in goal.items" :key="item.id">
              <ToDoItem :description="item.description" :quantity="item.quantity" :selected="item.completed"
                        @delete="onDeleteItem(goal.id, item.id)"
                        @snooze="onSnoozeItem(goal.id, item.id)"
                        @select="onChangeCompletion(goal.id, item.id, $event)"
                        @adjust="onAdjust(goal.id, item.id, $event)">
              </ToDoItem>
            </div>
          </Group>
        </div>
      </div>
      <div class="row">
        <div class="todo-list-container col-sm-12 col-lg-10 offset-lg-1">
          <div class="completed-amount">
            {{ completedLabel }}
          </div>
          <div class="row">
            <div class="history-line">
              <div class="history-box" v-for="(history) in completionHistory" :key="history.index">
                <div class="history-day">{{ history.day }}</div>
                <div class="history-count">{{ history.count }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateUtilities} from '../shared';
import { ToDoServiceFactory } from "@/shared/service";
//TODO replace with class/factory
import { ToDoData } from "@/shared/data";
import ToDoItem from "@/components/to-do-item";
import CheckBox from "@/components/check-box";
import Group from "@/components/group";

export default {
  name: 'ToDoList',
  components: {Group, CheckBox, ToDoItem},
  computed: {
    isAddInvalid() {
      return this.newItem == undefined || this.newItem.trim().length == 0;
    },
    completedLabel() {
      let finished = 0;
      if (this.goals !== undefined && this.goals.length > 0) {
        finished = this.goals
            .map(goal => goal.items.filter(item => item.completed).length)
            .reduce((accumulator, currentValue) => accumulator + currentValue);
      }
      if (finished == 0) {
        return "Just getting started !!!";
      }
      if (finished == 1) {
        return "1 item completed !!!";
      }
      return `${finished} items completed !!!`;
    },
    filteredGoals() {
      if (this.hideCompleted) {
        return this.goals
            .map(goal => Object.assign({}, goal, {items: goal.items.filter(i => !i.completed)}))
            .filter(goal => goal.items.length > 0);
      }
      return this.goals;
    }
  },
  data() {
    return {
      toDoService: {},
      newItem: '',
      hideCompleted: false,
      goals: [],
      completionHistory: []
    }
  },
  async created() {
    this.toDoService = ToDoServiceFactory.createInstance();
    await this.loadToDo();
    await this.loadCompletionHistory();
  },
  methods: {
    toggleHideCompleted(value) {
      this.hideCompleted = value;
    },
    async loadCompletionHistory() {
      const currentDate = new Date();
      const start = dateUtilities.convertToYYYYMMDD(dateUtilities.addDays(currentDate, -7));
      const end = dateUtilities.convertToYYYYMMDD(dateUtilities.addDays(currentDate, -1));
      const results = await ToDoData.getCompletionHistory(start, end);
      this.completionHistory = results.map(h => {
        return {
          index: h.index,
          day: dateUtilities.getAbrrDayName(dateUtilities.convertYYYYMMDDtoDate(h.completionDate)),
          count: h.count
        }
      }).reverse();
    },
    async onAddItemEnter(event) {
      if (event.keyCode === 13 && this.newItem !== undefined && this.newItem.trim().length > 0) {
        await this.onAddItem();
      }
    },
    async loadToDo() {
      this.goals = await this.toDoService.getToDoListForToday();
    },
    refresh() {
      this.goals = this.toDoService.getToDoListForToday();
      this.loadCompletionHistory();
    },

    async onAddItem() {
      let addedItem = await this.toDoService.addToDo(this.newItem);
      addedItem.quantity = 1;
      this.goals[0].items.push(addedItem);
      this.newItem = '';
    },

    findIndices(goalId, todoId) {
      const goalIndex = this.goals.findIndex(goal => goal.id === parseInt(goalId));
      if (goalIndex < 0) {
        console.log(`goal with id ${goalId} not found`);
        return undefined;
      }
      const todoIndex  = this.goals[goalIndex].items.findIndex(item => item.id === parseInt(todoId));
      if (goalIndex < 0) {
        console.log(`item with goal id ${goalId} and to do id ${todoId} not found`);
        return undefined;
      }
      return { goalIndex, todoIndex }
    },

    findItem(goalId, todoId) {
      const indices = this.findIndices(goalId, todoId);
      if (indices === undefined) {
        return undefined;
      }
      const { goalIndex, todoIndex} = indices;
      return this.goals[goalIndex].items[todoIndex];
    },

    removeItem(todo) {
      const indices = this.findIndices(todo.goalId, todo.id)
      if (indices !== undefined) {
        const {goalIndex, todoIndex } = indices;
        this.goals[goalIndex].items.splice(todoIndex, 1);
      }
    },

    async onChangeCompletion(goalId, todoId, value) {
      const todoItem = this.findItem(goalId, todoId);
      if (todoItem === undefined) {
        return;
      }
      todoItem.completed = value;
      await ToDoData.changeToDoCompletion(todoItem.id,
          todoItem.completed,
          todoItem.taskId);
    },

    async onDeleteItem(goalId, todoId) {
      const todoItem = this.findItem(goalId, todoId);
      if (todoItem === undefined) {
        return;
      }
      await this.toDoService.deleteToDo(todoItem.id);
      this.removeItem(todoItem);
    },

    async onSnoozeItem(goalId, todoId) {
      const todoItem = this.findItem(goalId, todoId);
      if (todoItem === undefined) {
        return;
      }
      await this.toDoService.snoozeToDo(todoItem.id, 1);
      this.removeItem(todoItem);
    },

    async onAdjust(goalId, todoId, adjustment) {
      const todoItem = this.findItem(goalId, todoId);
      if (todoItem === undefined) {
        return;
      }
      if (adjustment === '') {
        adjustment = 1;
      }
      const response = await this.toDoService.adjustQuantity(todoItem.id, adjustment);
      todoItem.quantity = response.quantity;
      todoItem.completed = response.completed;
    }
  }
}
</script>

<style lang="scss">

@import '../shared/style/theme';

.tdl-input {
  @include primary-input;
}

.tdl-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 15px;
  width: 100%;
}

.tdl-item {
  padding: 3px;
}

.history-day {
  text-align: center;
  font-size: 0.8rem;
}

.history-count {
  text-align: center;
}

.history-box {
  display: flex;
  flex-direction: column;
  border: solid 2px $primary-color-dark;
  margin: 10px 5px 5px;
  padding: 5px;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  justify-content: center;
}

.history-line {
  display: flex;
  flex-direction: row;
}

.completed-amount {
  font-size: 1.5em;
  font-style: italic;
}

.tdl-button {
  @include primary-button;
}


.left-margin-small {
  margin-left: 10px;
}

.bottom-margin-small {
  margin-bottom: 10px;
}

.bottom-margin-medium {
  margin-bottom: 20px;
}


.todo-list-container {
  @include container;
  text-align: left;
  width: 100%;
}

.todo-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.todo-list-container-heading {
  @include container-heading;
}

.todo-list-container-heading-title {
  @include container-heading-title;
}

</style>
