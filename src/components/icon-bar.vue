<template>
  <div class="icb-container">
    <div class="icb-tooltip" v-show="tooltipVisible">
      {{ tooltip }}
    </div>
    <div v-if="displayStart" class="icb-icon" @mouseover="showTooltip('start')" @mouseout="hideTooltip" @click="onClick('start')">
      <font-awesome-icon :icon="['far', 'play-circle']"/>
    </div>
    <div v-if="displaySnooze" class="icb-icon" @mouseover="showTooltip('snooze')" @mouseout="hideTooltip" @click="onClick('snooze')">
      <font-awesome-icon :icon="['far', 'clock']"/>
    </div>
    <div v-if="displaySchedule" class="icb-icon" @mouseover="showTooltip('schedule')" @mouseout="hideTooltip" @click="onClick('schedule')">
      <font-awesome-icon :icon="['far', 'calendar-alt']"/>
    </div>
    <div v-if="displayEdit" class="icb-icon" @mouseover="showTooltip('edit')" @mouseout="hideTooltip" @click="onClick('edit')">
      <font-awesome-icon :icon="['far', 'edit']"/>
    </div>
    <div v-if="displayDelete" class="icb-icon" @mouseover="showTooltip('delete')" @mouseout="hideTooltip" @click="onClick('delete')">
      <font-awesome-icon :icon="['far', 'times-circle']"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconBar',
  data() {
    return {
      tooltipVisible: false,
      tooltip: '',
    }
  },
  computed:{
    displaySnooze() {
      return this.icons.indexOf('snooze') > -1;
    },
    displayDelete() {
      return this.icons.indexOf('delete') > - 1;
    },
    displayEdit() {
      return this.icons.indexOf('edit') > - 1;
    },
    displaySchedule() {
      return this.icons.indexOf('schedule') > -1;
    },
    displayStart() {
      return this.icons.indexOf('start') > -1;
    }
  },
  props: {
    icons: {
      required: true
    }
  },
  methods: {
    showTooltip(value) {
      this.tooltip = value;
      this.tooltipVisible = true;
    },
    hideTooltip() {
      this.tooltipVisible = false;
    },
    onClick(value) {
      this.$emit('clickIcon',value);
    }
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme';

.icb-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.icb-tooltip {
  padding-right: 5px;
  font-size: 12px;
}

.icb-icon {
  font-size: 18px;
  color: #666666;
  padding-right: 5px;

  &:hover {
    color: $primary-color;
  }

  &:hover:active {
    color: $primary-color-dark;
  }
}

</style>
