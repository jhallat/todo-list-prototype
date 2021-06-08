<template>
  <div id="app">
    <header>
      <img class="logo" src="./assets/to-do-logo-v2.svg">
      Get Everything Done !!!
    </header>
    <nav>

    </nav>
    <main>
      <!-- <Group/> -->
      <ToDoList/>
    </main>
    <footer>

    </footer>
  </div>
</template>

<script>
import ToDoList from '@/components/to-do-list';
//import Group from '@/components/group';

export default {
  name: 'App',
  components: {
    //Group,
    ToDoList
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;0,500;1,400&display=swap');
@import 'shared/style/theme.scss';

html {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  background-color: $alternate-color-light;
}

* {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

#app {
  font-family: Ubuntu, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
}

header {
  display: flex;
  align-items: center;
  background-color: $primary-color;
  color: white;
  font-size: 18px;
  font-style: italic;
  .logo {
    width: 25px;
    margin-right: 10px;
  }
  margin: auto;
  padding: 10px;
  @media only screen and (min-width: 768px) {
    font-size: 22px;
    .logo {
      width: 45px;
      margin-right: 10px;
    }
  }
}

@media only screen and (min-width: 768px) {

}

@media only screen and (min-width: 1024px) {

}

</style>
