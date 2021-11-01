<template>
  <div class="tkp-container">
    <div :hidden="!task.isQuantifiable">
      <input class="tkp-quantity-input" placeholder="1" v-model="quantity" maxlength="3" size="3">
    </div>
    <div class="no-wrap tkp-description" @click="onClickEdit">
      {{ task.description }}
    </div>
    <div :hidden="!task.isOngoing" class="tkp-decoration">
      <font-awesome-icon icon="sync"/>
    </div>
    <div :hidden="!task.isQuantifiable" class="tkp-decoration">
      <font-awesome-icon icon="hashtag"/>
    </div>
    <div class="tkp-icon-bar">
      <IconBar icons="delete, schedule, start" @clickIcon = "onClickIcon($event)"></IconBar>
    </div>
  </div>
</template>

<script>
import IconBar from "@/components/icon-bar";
export default {
  name: 'TaskItem',
  components: {IconBar},
  props: {
    task: {
      required: true
    }
  },
  data() {
    return {
      quantity: 1
    }
  },
  methods: {
    onClickEdit() {
      this.$emit('edit');
    },
    onClickIcon(value) {
      if (value == 'start') {
        this.$emit('start', this.quantity);
      } else {
        this.$emit(value);
      }
    }
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme';

.tkp-container {
  @include item-container;
  &:hover {
    .tkp-icon-bar {
      visibility: visible;
    }
  }
}

.tkp-description {
  &:hover {
    color: $primary-color;
    text-decoration: underline;
    cursor: pointer;
  }
}

.tkp-icon-bar {
  visibility: hidden;
  width: 100%;
}

.tkp-decoration {
  margin-left: 5px;
  color: $primary-color-x-dark;
}

.tkp-quantity-input {
  margin-right: 10px;
  width: 40px;
}

</style>
