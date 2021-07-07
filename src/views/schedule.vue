<template>
  <div class="row">
    <div class="schedule-container col-sm-12 col-lg-10 offset-lg-1">
      <div class="schedule-container-heading">
        <div class="schedule-container-heading-title">Schedule</div>
      </div>
      <div class="input-line bottom-margin-medium">
        <div>
          <label>Description</label>
          <input />
        </div>
        <DaySelector></DaySelector>
        <button>Add</button>
      </div>
      <div class="row schedule-content">
        <div class="schedule-item" v-for="(schedule) in schedules" :key="schedule.id">
          {{schedule.description}}(
          <DayDisplay></DayDisplay>)
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {scheduleData} from '../shared';
import DaySelector from "@/components/day-selector";
import DayDisplay from "@/components/day-display";
export default {
  name: 'Schedule',
  components: {DayDisplay, DaySelector},
  data() {
    return {
      schedules: []
    }
  },
  async created() {
    await this.loadSchedule();
  },
  methods: {
    async loadSchedule() {
      this.schedules = await scheduleData.getSchedules();
      console.log(this.schedules)
    }
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme';

.schedule-container {
  @include container;
  text-align: left;
}

.schedule-container-heading {
  @include container-heading;
}

.schedule-container-heading-title {
  @include container-heading-title;
}

.schedule-item {
  display: flex;
  flex-direction: row;
}

.input-line {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.schedule-content {
  display: flex;
  flex-direction: column;
}

</style>
