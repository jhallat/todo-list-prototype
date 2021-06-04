<template>
  <div id="app">
    <div class="todo-list-container">
    <div class="todo-list-container-heading">To Do List</div>
    <input class="bottom-margin-medium" v-model="newItem" @keypress="onAddItemEnter"/>
    <button class="left-margin-small" @click="onAddItem" :disabled="isAddInvalid">Add</button>
    <div v-for="(item, index) in todo" :key="item.id">
      <input type="checkbox" v-model="item.completed" @change="onChangeCompletion(index)">
      {{ item.description }}
    </div>
    </div>
  </div>
</template>

<script>
import {data} from './shared/data';

export default {
  name: 'App',
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
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 60px;
}

button {
  border: none;
  border-radius: 3px;
  padding: 5px;
  background-color: white;
  color: #2c3e50;
}

button:disabled {
  color: #cccccc;
}

button:hover {
  background-color: #eeeeee;
}

button:hover:disabled {
  background-color: #ffffff;
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
  text-align: left;
}

.todo-list-container-heading {
  font-weight: bold;
}
</style>
