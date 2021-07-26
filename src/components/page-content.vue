<template>
  <div class="pct-container">
    <div class="pct-heading">{{ title }}</div>
    <div class="pct-contents">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageContent',
  props: {
    title: String
  }
}
</script>

<style lang="scss">
@import "../shared/style/theme";

.pct-container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: white;
  border: solid 1px $primary-color-x-dark;
  border-radius: 10px;
}

.pct-heading {
  padding: 10px;
  color: $primary-color-x-dark;
  font-size: 18px;
}

.pct-contents {
  position: absolute;
  left: 3px;
  right: 3px;
  bottom: 3px;
  top: 30px;
  overflow: scroll;
}


</style>
