<template>
  <div class="lsn-container margin-top-med-large">
    <div class="lsn-heading margin-bottom-small">
      <div v-if="display" @click="onToggleDisplay" class="lsn-display-toggle">
        <font-awesome-icon icon="minus-circle"/>
      </div>
      <div v-if="!display" @click="onToggleDisplay"  class="lsn-display-toggle">
        <font-awesome-icon icon="plus-circle"/>
      </div>
      {{ heading }}
    </div>
    <div v-if="display" class="lsn-content" :style="{'max-height':maxHeight}">
    <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListSection',
  data() {
    return {
      display: true,
    }
  },
  props: {
    heading: {
      default: () => {
        return '';
      }
    },
    maxHeight: {
      default:() => {
        return '200px';
      }
    }
  },
  methods: {
    onToggleDisplay() {
      this.display = !this.display
    }
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme';

.lsn-heading {
  color: $primary-color-dark;
  border-bottom: solid 1px $primary-color-dark;
}

.lsn-content {
  overflow: scroll;
}

.lsn-display-toggle {
  display: inline;
  &:hover {
    color: $primary-color;
  }
}

</style>
