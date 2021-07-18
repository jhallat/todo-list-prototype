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
        <div class="to-do-list-section">
          <div class="to-do-list-item col-sm-12 col-md-6" v-for="(item, index) in todo" :key="item.id">
            <div v-if="!hideCompleted || (hideCompleted && !item.completed)">
            <ToDoItem :description="item.description" :quantity="item.quantity" :selected="item.completed"
                      @delete="onDeleteItem(index)"
                      @snooze="onSnoozeItem(index)"
                      @select="onChangeCompletion(index, $event)"
                      @adjust="onAdjust(index, $event)">
            </ToDoItem>
            </div>
          </div>
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
import {todoData, dateTools} from '../shared';
import ToDoItem from "@/components/to-do-item";
import CheckBox from "@/components/check-box";

export default {
  name: 'ToDoList',
  components: {CheckBox, ToDoItem},
  computed: {
    isAddInvalid() {
      return this.newItem == undefined || this.newItem.trim().length == 0;
    },
    completedLabel() {
      const finished = this.todo.filter(t => t.completed).length;
      if (finished == 0) {
        return "Just getting started !!!";
      }
      if (finished == 1) {
        return "1 item completed !!!";
      }
      return `${finished} items completed !!!`;
    },
  },
  data() {
    return {
      newItem: '',
      hideCompleted: false,
      todo: [],
      completionHistory: []
    }
  },
  async created() {
    await this.loadToDo();
    await this.loadCompletionHistory();
  },
  methods: {
    toggleHideCompleted(value) {
      this.hideCompleted = value;
    },
    async loadCompletionHistory() {
      const currentDate = new Date();
      const start = dateTools.convertToYYYYMMDD(dateTools.addDays(currentDate, -7));
      const end = dateTools.convertToYYYYMMDD(dateTools.addDays(currentDate, -1));
      const results = await todoData.getCompletionHistory(start, end);
      this.completionHistory = results.map(h => {
        return {
          index: h.index,
          day: dateTools.getAbrrDayName(dateTools.convertYYYYMMDDtoDate(h.completionDate)),
          count: h.count
        }
      }).reverse();
    },
    async onAddItemEnter(event) {
      if (event.keyCode == 13 && this.newItem != undefined && this.newItem.trim().length > 0) {
        await this.onAddItem();
      }
    },
    async loadToDo() {
      this.todo = await todoData.getToDo();
    },
    refresh() {
      this.loadToDo();
      this.loadCompletionHistory();
    },
    async onAddItem() {
      let addedItem = await todoData.addToDo(this.newItem);
      addedItem.quantity = 1;
      this.todo.push(addedItem);
      this.newItem = '';
    },
    async onChangeCompletion(index, value) {
      this.todo[index].completed = value;
      await todoData.changeToDoCompletion(this.todo[index].id,
          this.todo[index].completed,
          this.todo[index].taskId);
    },
    async onDeleteItem(index) {
      await todoData.deleteToDo(this.todo[index].id);
      this.todo.splice(index, 1);
    },
    async onSnoozeItem(index) {
      await todoData.snoozeToDo(this.todo[index].id, 1);
      this.todo.splice(index, 1);
    },
    async onAdjust(index, adjustment) {
      const id = this.todo[index].id;
      if (adjustment === '') {
        adjustment = 1;
      }
      const response = await todoData.adjustQuantity(id, adjustment);
      this.todo[index].quantity = response.quantity;
      this.todo[index].completed = response.completed;
    }
  }
}
</script>

<style lang="scss">

@import '../shared/style/theme';

.tdl-input {
  @include primary-input;
}

.to-do-list-section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.to-do-list-item {
  padding: 5px;
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
