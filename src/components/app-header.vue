<template>
  <div class="header">
    <img class="logo" src="../assets/to-do-logo-v2.svg">
    Get Everything Done !!!
    <button @click="onMenuToggle">&#9776;</button>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  methods: {
    onMenuToggle() {
      this.$emit("menuToggle");
    }
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme.scss';

.header {
  button {
    background-color: $primary-color;
    color: white;
    float: right;
    margin-left: auto;
    @media only screen and (min-width: $large) {
      visibility: hidden;
    }
    &:hover {
      background-color: $primary-color-light;
    }
  }

  display: flex;
  align-items: center;
  background-color: $primary-color;
  color: white;
  font-size: 1.2rem;
  font-style: italic;

  .logo {
    width: 25px;
    margin-right: 10px;
  }
  width: 100%;
  margin: auto;
  padding: 10px;
  @media only screen and (min-width: $large) {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    font-size: 1.75rem;
    .logo {
      width: 45px;
      margin-right: 10px;
    }
  }
}
</style>