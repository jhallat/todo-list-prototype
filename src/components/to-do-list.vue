<template>
  <div class="todo-list-container">
    <div class="todo-list-container-heading">To Do List</div>
    <input class="bottom-margin-medium" v-model="newItem" @keypress="onAddItemEnter"/>
    <button class="left-margin-small" @click="onAddItem" :disabled="isAddInvalid">Add</button>
    <div class="todo-item" v-for="(item, index) in todo" :key="item.id">
      <input type="checkbox" v-model="item.completed" @change="onChangeCompletion(index)">
      {{ item.description }}
      <button class="left-margin-small" @click="onDeleteItem(index)">Delete</button>
    </div>
  </div>
</template>

<script>
import {data} from '../shared/data';

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
      this.todo = await data.getToDo();
    },
    async onAddItem() {
      let addedItem = await data.addToDo(this.newItem);
      this.todo.push(addedItem);
      this.newItem = '';
    },
    async onChangeCompletion(index) {
      await data.changeToDoCompletion(this.todo[index].id, this.todo[index].completed);
    },
    async onDeleteItem(index) {
      await data.deleteToDo(this.todo[index].id);
      this.todo.splice(index, 1);
    }
  }
}
</script>

<style lang="scss">

@import '../shared/style/theme.scss';

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

.todo-item {
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
  @include container(350px);
  text-align: left;
  width: 100%;
  margin: auto;
}

.todo-list-container-heading {
  @include container-heading;
}

input[type=checkbox] {
  background-color: #2196F3;
}
</style>