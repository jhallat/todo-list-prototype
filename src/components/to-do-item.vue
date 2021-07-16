<template>
  <div class="to-do-item">
    <div class="check todo-selected" v-if="selected" @click="toggleSelect()">
      <font-awesome-icon :icon="['fas', 'check-square']"/>
    </div>
    <div class="check todo-unselected" v-else @click="toggleSelect()">
      <font-awesome-icon :icon="['far', 'square']"/>
    </div>
    <div class="item-label">
      {{ generateLabel(description, quantity) }}
    </div>

    <div class="icon-bar">
      <div class="tooltip" v-show="showSnooze">
        Snooze
      </div>
      <div class="tooltip" v-show="showDelete">
        Delete
      </div>
      <div class="icon-button" @mouseover="toggleSnooze(true)" @mouseout="toggleSnooze(false)" @click="onSnooze">
        <font-awesome-icon :icon="['far', 'clock']"/>
      </div>
      <div class="icon-button" @mouseover="toggleDelete(true)" @mouseout="toggleDelete(false)" @click="onDelete">
        <font-awesome-icon :icon="['far', 'times-circle']"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDoItem',
  props: {
    description: {
      type: String,
      required: true
    },
    quantity: {
      default: () => {
        return 1;
      }
    },
    selected: {
      default: () => {
        return false;
      }
    }
  },
  data() {
    return {
      showSnooze: false,
      showDelete: false
    }
  },
  methods: {
    generateLabel(description, quantity) {
      if (description.includes('#')) {
        const temp = description.replace('#', quantity);
        if (temp.includes(`(s)`)) {
          if (quantity == 1) {
            return temp.replace(`(s)`, '');
          } else {
            return temp.replace(`(s)`, 's');
          }
        } else {
          return temp;
        }
      } else {
        if (quantity == 1) {
          return description;
        }
        return `${quantity} ${description}`
      }
    },
    toggleSelect() {
      this.$emit("select", !this.selected);
    },
    toggleSnooze(value) {
      this.showSnooze = value;
    },
    toggleDelete(value) {
      this.showDelete = value;
    },
    onDelete() {
      this.$emit("delete");
    },
    onSnooze() {
      this.$emit("snooze");
    },
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme';

.to-do-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  border-radius: 5px;

  &:hover {
    background-color: $accent-color;

    .icon-button {
      visibility: visible;
    }
  }
}

.item-label {
  white-space: nowrap;
}

.icon-bar {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.icon-button {
  font-size: 18px;
  visibility: hidden;
  color: #666666;
  margin-right: 5px;

  &:hover {
    color: $primary-color;
  }

  &:hover:active {
    color: $primary-color-dark;
  }
}

.check {
  font-size: 18px;
  margin-right: 5px;
}

.todo-unselected {
  color: #666666;
}

.todo-selected {
  color: $primary-color;
}

.tooltip {
  margin-right: 5px;
  font-size: 12px;
}

</style>
