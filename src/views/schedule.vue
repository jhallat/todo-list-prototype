<template>
  <div class="row">
    <div class="schedule-container col-sm-12 col-lg-10 offset-lg-1">
      <div class="schedule-container-heading">
        <div class="schedule-container-heading-title">Schedule</div>
      </div>
      <div class="input-line bottom-margin-medium">
        <div>
          <label>Description</label>
          <input v-model="newSchedule.description"/>
        </div>
        <DaySelector :selected-days="newSchedule.selectedDays"></DaySelector>
        <button @click="onAddSchedule">Add</button>
      </div>
      <div class="row schedule-content">
        <div class="schedule-item" v-for="(schedule) in schedules" :key="schedule.id">
          {{schedule.description}}(
          <DayDisplay :selected-days="schedule.selectedDays"></DayDisplay>)
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
      newSchedule: {
        description: '',
        selectedDays: {
          sunday: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false
        }
      },
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
    },
    async onAddSchedule() {
      const response = await scheduleData.addSchedule(this.newSchedule)
      console.log(response)
      if (response != null) {
        this.schedules.push(response);
      }
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
