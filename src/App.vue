<template>
  <div class="row max-height">
    <div class="col-sm-12 col-lg-10 offset-lg-1 max-height">
      <div id="app" class="row">
        <header>
          <AppHeader @menuToggle="onMenuToggle"/>
        </header>
        <nav class="clearfix" >
          <ul v-bind:class="{ open: isMenuOpen }">
            <li><router-link @click.native="onMenuToggle" to="/to-do-list">To Do List</router-link></li>
            <li><router-link @click.native="onMenuToggle" to="/goals">Goals</router-link></li>
            <li><router-link @click.native="onMenuToggle" to="/tasks">Tasks</router-link></li>
          </ul>
        </nav>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/app-header'

export default {
  components: {
    AppHeader
  },
  data() {
    return {
      isMenuOpen: false,
    }
  },
  methods: {
    onMenuToggle() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;0,500;1,400&display=swap');
@import 'shared/style/theme.scss';

html {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  height: 100%;
  @media only screen and (min-width: $large) {
    height: 95%;
  }
}

body {
  height: 100%;
  margin-bottom: 20px;
  background-color: #eeeeee;
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
  background-image: linear-gradient($alternate-color-light, $alternate-color-x-light);
  height: 100%;
  @media only screen and (min-width: $large) {
    margin: 20px auto;
    border-radius: 10px;
    box-shadow: 10px 10px 10px #888888;
  }

}

nav {
  background-color: $primary-color-dark;

  ul {
    display: none;
    padding: 0;
    margin: 0;
    &.open {
      display: block;
    }
    @media only screen and (min-width: $large) {
      display: block;
    }
    li {
      list-style-type: none;
      @media only screen and (min-width: $large) {
        width: 15%;
        float: left;
      }
    }
  }

  a {
    color: $accent-color;
    text-decoration: none;
    display: block;
    padding: 0.8rem 0;
    text-align: center;
    &:hover {
      background-color: $accent-color-dark;
      color: $primary-color-xx-dark;
    }

    &.router-link-exact-active {
      color: white;
      background-color: $primary-color-x-dark;
    }
  }
}
</style>
