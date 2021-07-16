<template>
  <div>
  <div class="row">
    <div class="todo-list-container col-sm-12 col-lg-10 offset-lg-1">
      <div class="todo-list-container-heading">
        <div class="todo-list-container-heading-title">To Do List</div>
        <div class="button-bar">
          <button @click="loadToDo">Refresh</button>
        </div>
      </div>
      <input class="bottom-margin-medium" v-model="newItem" @keypress="onAddItemEnter"/>
      <button class="left-margin-small" @click="onAddItem" :disabled="isAddInvalid">Add</button>
      <div class="row">
        <div class="col-sm-12 col-md-6" v-for="(item, index) in todo" :key="item.id">
          <ToDoItem :description="item.description" :quantity="item.quantity" :selected="item.completed"
                    @delete="onDeleteItem(index)"
                    @snooze="onSnoozeItem(index)"
                    @select="onChangeCompletion(index, $event)"></ToDoItem>
         </div>
      </div>
    </div>
    <div class="row">
      <div class="todo-list-container col-sm-12 col-lg-10 offset-lg-1">
        <div class="completed-amount">
          {{ completedLabel }}
        </div>
        <div class="row">
          <div class="history-box" v-for="(history) in completionHistory" :key="history.index">
            <div class="history-day">{{ history.day }}</div>
            <div class="history-count">{{ history.count }}</div>
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

export default {
  name: 'ToDoList',
  components: {ToDoItem},
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
      todo: [],
      completionHistory: []
    }
  },
  async created() {
    await this.loadToDo();
    await this.loadCompletionHistory();
  },
  methods: {
    generateLabel(description, quantity) {
      if (description.includes('#')) {
        const temp = description.replace('#', quantity);
        if (temp.includes(`(s)`)) {
          if (quantity == 1) {
            return temp.replace(`(s)`, '');
          } else {
            return temp.replace(`(s)`, 's');
          }
        } else {
          return temp;
        }
      } else {
        if (quantity == 1) {
          return description;
        }
        return `${quantity} ${description}`
      }
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
      });
      console.log(JSON.stringify(this.completionHistory));
    },
    async onAddItemEnter(event) {
      if (event.keyCode == 13 && this.newItem != undefined && this.newItem.trim().length > 0) {
        await this.onAddItem();
      }
    },
    async loadToDo() {
      const response  = await todoData.getToDo();
      this.todo = response.map(item => Object.assign({}, item, {adjustment:''}));
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
    async onAdjust(index) {
      const id = this.todo[index].id;
      let adjustment = this.todo[index].adjustment;
      if (adjustment === '') {
         adjustment = 1;
      }
      const response = await todoData.adjustQuantity(id, adjustment);
      this.todo[index].quantity = response.quantity;
      this.todo[index].completed = response.completed;
      this.todo[index].adjustment = '';
    }
  }
}
</script>

<style lang="scss">

@import '../shared/style/theme';

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

input::placeholder {
  color: #333333;
}

.completed-amount {
  font-size: 1.5em;
  font-style: italic;
}

button {
  border: none;
  border-radius: 3px;
  padding: 5px;
  background-color: white;
  color: #2c3e50;

  &:disabled {
    color: #cccccc;
  }

  &:hover {
    background-color: #eeeeee;

    &:disabled {
      background-color: #ffffff;
    }
  }
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

.todo-input {
  margin-right: 5px;

  input[type=text] {
    width: 40px;
    border: 1px solid #888888;
    border-radius: 2px 0px 0px 2px;
  }

  .adjust-button {
    visibility: visible;
    background-color: $primary-color;
    color: white;
    width: 20px;
    height: 23px;
    font-weight: bold;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
    border: 1px solid #888888;
    border-left: none;
    display: inline-flex;
    align-items: center;

    &:hover:active {
      background-color: $primary-color-dark;
    }
  }
}

.todo-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  border-radius: 5px;

  button {
    visibility: hidden;
    background: none;
    float: right;
  }

  &:hover {
    background-color: $accent-color;

    button {
      visibility: visible;
    }
  }
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

input[type=checkbox] {
  background-color: #2196F3;
}
</style>
