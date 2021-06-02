<template>
  <div id="app">
    <div class="todo-list-container">
    <div class="todo-list-container-heading">To Do List</div>
    <input class="bottom-margin-medium" v-model="newItem"/>
    <button class="left-margin-small" @click="onAddItem">Add</button>
    <div v-for="item in todo" :key="item.id">
      <input type="checkbox" :value="item.completed">
      {{ item.description }}
    </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data() {
    return {
      newItem: '',
      todo: [
        {
          id: 1,
          timestamp: '20210530',
          description: 'Clean Kitchen',
          completed: false
        },
        {
          id: 2,
          timestamp: '20210530',
          description: 'Pack Electronics',
         completed: false
        }
      ]
    }
  },
  methods: {
    onAddItem() {
      this.todo.push({id: 0, description: this.newItem, timestamp: '', completed: false})
    }
  }
}
</script>

<style>
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

button:hover {
  background-color: #eeeeee;
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
