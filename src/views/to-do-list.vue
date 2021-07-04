<template>
  <div class="row">
    <div class="todo-list-container col-sm-12 col-lg-10 offset-lg-1">
      <div class="todo-list-container-heading">To Do List</div>
      <input class="bottom-margin-medium" v-model="newItem" @keypress="onAddItemEnter"/>
      <button class="left-margin-small" @click="onAddItem" :disabled="isAddInvalid">Add</button>
      <div class="row">
        <div class="todo-item col-sm-12 col-md-6" v-for="(item, index) in todo" :key="item.id">
          <div v-if="item.quantity <= 1" class="todo-input">
            <input type="checkbox" v-model="item.completed" @change="onChangeCompletion(index)">
          </div>
          <div v-if="item.quantity > 1" class="todo-input">
            <input type="text" placeholder="1" v-model="item.adjustment" />
            <button class="adjust-button" @click="onAdjust(index)">-</button>
          </div>
          <span v-if="item.quantity > 1">{{item.quantity}}</span>&nbsp;{{ item.description }}
          <button class="left-margin-small" @click="onDeleteItem(index)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {todoData} from '../shared/todo-data';

export default {
  name: 'ToDoList',
  components: {},
  computed: {
    isAddInvalid() {
      return this.newItem == undefined || this.newItem.trim().length == 0;
    }
  },
  data() {
    return {
      newItem: '',
      todo: []
    }
  },
  async created() {
    await this.loadToDo();
  },
  methods: {
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
      this.todo.push(addedItem);
      this.newItem = '';
    },
    async onChangeCompletion(index) {
      await todoData.changeToDoCompletion(this.todo[index].id,
          this.todo[index].completed,
          this.todo[index].taskId);
    },
    async onDeleteItem(index) {
      await todoData.deleteToDo(this.todo[index].id);
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

input::placeholder {
  color: #333333;
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

input[type=checkbox] {
  background-color: #2196F3;
}
</style>
