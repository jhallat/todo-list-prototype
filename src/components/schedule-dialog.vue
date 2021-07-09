<template>
    <div class="dialog-background">
      <div class="dialog">
        <div class="dialog-title">Select Schedule</div>
        <div class="dialog-contents">
          <label>Schedule</label>
          <select v-model="selectedId">
            <option v-for="schedule in schedules" :value="schedule.id" :key="schedule.id">{{ schedule.description }}</option>
          </select>
        </div>
        <div class="dialog-button-bar">
          <button @click="onOk">Ok</button>
          <button @click="onCancel">Cancel</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ScheduleDialog',
  data() {
    return {
      selectedId: 0
    }
  },
  props: {
    schedules: Array,
    default: () => []
  },
  methods: {
    onOk() {
      this.$emit('dialogOk', this.selectedId);
    },
    onCancel() {
      this.$emit('dialogCancel');
    }
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme';

.dialog-button-bar {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: right;
  padding-right: 10px;
  button {
    &:hover {
      cursor: pointer;
    }
  }
}

.dialog-background {
  z-index: 2;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.5);
}

.dialog-contents {
  padding: 10px;
  height: 130px;
}

.dialog-title {
  background-color: $primary-color;
  padding: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: white;
}

.dialog {
  width: 200px;
  height: 200px;
  margin: 200px auto auto;
  background-color: white;
  border-radius: 5px;
}
</style>
