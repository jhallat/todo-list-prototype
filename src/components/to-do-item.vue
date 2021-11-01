<template>
  <div class="tdi-container">
    <div v-if="quantity <= 1">
      <CheckBox :selected="selected" @select="toggleSelect($event)"></CheckBox>
    </div>
    <div v-else class="tdi-adjust">
      <input type="text" placeholder="1" maxlength="3" v-model="adjustment"/>
      <button class="adjust-button" @click="onAdjust">-</button>
    </div>
    <div class="no-wrap" :class="{ 'tdi-editable': editable }" @click = "onEdit">
      <QualifiedLabel :description="description" :quantity="quantity" />
    </div>
    <div class="tdi-icon-bar">
      <IconBar icons="snooze, delete" @clickIcon = "onClickIcon($event)"></IconBar>
    </div>
  </div>
</template>

<script>
import CheckBox from "@/components/check-box";
import IconBar from "@/components/icon-bar";
import QualifiedLabel from "@/components/quantified-label";
export default {
  name: 'ToDoItem',
  components: {QualifiedLabel, IconBar, CheckBox},
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
    },
    editable: {
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
      let labelQuantity = quantity;
      if (quantity < 1) {
        labelQuantity = 1;
      }
      if (description.includes('#')) {
        const temp = description.replace('#', labelQuantity);
        if (temp.includes(`(s)`)) {
          if (labelQuantity == 1) {
            return temp.replace(`(s)`, '');
          } else {
            return temp.replace(`(s)`, 's');
          }
        } else {
          return temp;
        }
      } else {
        if (labelQuantity == 1) {
          return description;
        }
        return `${labelQuantity} ${description}`
      }
    },
    toggleSelect(value) {
      this.$emit("select", value);
    },
    onClickIcon(value) {
      this.$emit(value);
    },
    onAdjust() {
      this.$emit("adjust", this.adjustment);
      this.adjustment = '';
    },
    onEdit() {
      if (this.editable) {
        this.$emit("edit");
      }
    }
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme';

.tdi-container {
  @include item-container;

  &:hover {
    .tdi-icon-bar {
      visibility: visible;
    }
  }
  input:focus {
      outline-style: none;
  }
}

.tdi-icon-bar {
  visibility: hidden;
  width: 100%;
}


.tooltip {
  padding-right: 5px;
  font-size: 12px;
}

.tdi-editable {
  &:hover {
    color: $primary-color;
    text-decoration: underline;
    cursor: pointer;
  }
}

.tdi-adjust {
  min-width: 60px;

  input[type=text] {
    width: 35px;
    border: 1px solid $primary-color-dark;
    border-radius: 5px 0px 0px 5px;
  }

  .adjust-button {
    background-color: $primary-color;
    color: white;
    width: 20px;
    height: 23px;
    font-weight: bold;
    border-radius: 0 5px 5px 0;
    border: 1px solid $primary-color-dark;
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
