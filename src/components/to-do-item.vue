<template>
  <div class="tdi-container">
    <div v-if="quantity == 1">
      <CheckBox :selected="selected" @select="toggleSelect($event)"></CheckBox>
    </div>
    <div v-else class="todo-input">
      <input type="text" placeholder="1" maxlength="3" v-model="adjustment"/>
      <button class="adjust-button" @click="onAdjust">-</button>
    </div>
    <div class="no-wrap">
      {{ generateLabel(description, quantity) }}
    </div>
    <div class="tdi-icon-bar">
      <div class="tooltip" v-show="showSnooze">
        Snooze
      </div>
      <div class="tooltip" v-show="showDelete">
        Delete
      </div>
      <div class="tdi-icon-button" @mouseover="toggleSnooze(true)" @mouseout="toggleSnooze(false)" @click="onSnooze">
        <font-awesome-icon :icon="['far', 'clock']"/>
      </div>
      <div class="tdi-icon-button" @mouseover="toggleDelete(true)" @mouseout="toggleDelete(false)" @click="onDelete">
        <font-awesome-icon :icon="['far', 'times-circle']"/>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBox from "@/components/check-box";
export default {
  name: 'ToDoItem',
  components: {CheckBox},
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
    toggleSelect(value) {
      this.$emit("select", value);
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

.tdi-container {
  @include item-container;

  &:hover {
    .tdi-icon-button {
      visibility: visible;
    }
  }

  input:focus {
    outline: none;
  }
}

.tdi-icon-bar {
  @include icon-bar;
  width: 100%;
}

.tdi-icon-button {
  @include icon-button;
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
