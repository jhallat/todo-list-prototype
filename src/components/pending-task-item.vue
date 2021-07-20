<template>
  <div class="png-container">
    <div class="no-wrap">
      {{ task.description }}
    </div>
    <div :hidden="!task.isOngoing" class="png-decoration">
      <font-awesome-icon icon="sync"/>
    </div>
    <div :hidden="!task.isQuantifiable" class="png-decoration">
      <font-awesome-icon icon="hashtag"/>
    </div>
    <div class="png-icon-bar">
      <IconBar icons="edit" @clickIcon = "onClickIcon($event)"></IconBar>
    </div>
  </div>
</template>

<script>
import IconBar from "@/components/icon-bar";
export default {
  name: 'PendingTaskItem',
  components: {IconBar},
  props: {
    task: {
      required: true
    }
  },
  methods: {
    onClickIcon(value) {
      this.$emit(value);
    }
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme';

.png-container {
  @include item-container;
  &:hover {
    .png-icon-bar {
      visibility: visible;
    }
  }
}

.png-icon-bar {
  visibility: hidden;
  width: 100%;
}

.png-decoration {
  margin-left: 5px;
  color: $primary-color-x-dark;
}
</style>
