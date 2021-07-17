<template>
  <div class="cbx-container">
    <div class="cbx-icon cbx-selected" v-if="selected" @click="toggleSelect()">
      <font-awesome-icon :icon="['fas', 'check-square']"/>
    </div>
    <div class="cbx-icon cbx-unselected" v-else @click="toggleSelect()">
      <font-awesome-icon :icon="['far', 'square']"/>
    </div>
    <div>
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  props: {
    selected: {
      default: () => { return false; }
    },
    label: {
      default: () => { return '';  }
    }
  },
  methods: {
    toggleSelect() {
      this.$emit("select", !this.selected)
    }
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme';

.cbx-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.cbx-icon {
  font-size: 18px;
  padding-right: 5px;
}

.cbx-unselected {
  color: #666666;
}

.cbx-selected {
  color: $primary-color;
}

</style>
