<template>
  <div class="grp-container">
    <div class="grp-heading"> {{ heading }}</div>
    <div class="grp-contents">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Group',
  props: {
    heading: {
      default: () => ''
    }
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme';

.grp-heading {
  color: $primary-color-x-dark;
  font-size: 0.9em;
  border-bottom: solid 1px $primary-color-x-dark;
  width: 100%;
}

.grp-container {
  display: block;
  clear: both;
  width: 100%;
}


</style>
