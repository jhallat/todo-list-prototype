<template>
  <div class="to-do-item">
    <div class="check todo-selected" v-if="selected && quantity == 1" @click="toggleSelect()">
      <font-awesome-icon :icon="['fas', 'check-square']"/>
    </div>
    <div class="check todo-unselected" v-if="!selected && quantity == 1" @click="toggleSelect()">
      <font-awesome-icon :icon="['far', 'square']"/>
    </div>
    <div v-if="quantity > 1" class="todo-input">
      <input type="text" placeholder="1" maxlength="3" v-model="adjustment"/>
      <button class="adjust-button" @click="onAdjust">-</button>
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
      adjustment: '',
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
    onAdjust() {
      this.$emit("adjust", this.adjustment);
      this.adjustment = '';
    }
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme';

.to-do-item {
  margin-bottom: 3px;
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
  padding-right: 5px;

  &:hover {
    color: $primary-color;
  }

  &:hover:active {
    color: $primary-color-dark;
  }
}

.check {
  font-size: 18px;
  padding-right: 5px;
}

.todo-unselected {
  color: #666666;
}

.todo-selected {
  color: $primary-color;
}

.tooltip {
  padding-right: 5px;
  font-size: 12px;
}

.todo-input {
  min-width: 60px;

  input[type=text] {
    width: 35px;
    border: 1px solid #888888;
    border-radius: 2px 0px 0px 2px;
  }

  .adjust-button {
    background-color: $primary-color;
    color: white;
    width: 20px;
    height: 23px;
    font-weight: bold;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
    border: 1px solid #888888;
    border-left: none;
    display: inline-flex;
    align-items: center;

    &:hover:active {
      background-color: $primary-color-dark;
    }
  }
}

input::placeholder {
  color: #333333;
}
</style>
