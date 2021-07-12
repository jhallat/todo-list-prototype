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
          <div class="schedule-heading">
            {{ schedule.description }}(
            <DayDisplay :selected-days="schedule.selectedDays"></DayDisplay>
            )
          </div>
          <div class="task-list">
            <div v-for="(task) in schedule.tasks" :key="task.taskId">
              {{ task.taskQuantity }} - {{ task.taskDescription }}
            </div>
          </div>
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
      const schedules = await scheduleData.getSchedules();
      const schedulesWithTasks = [];
      for (let i = 0; i < schedules.length; i++) {
        const tasks = await scheduleData.getTasks(schedules[i].id);
        schedulesWithTasks.push(Object.assign({}, schedules[i], {tasks}));
      }
      this.schedules = schedulesWithTasks;
      console.log(this.schedules)
    },
    async onAddSchedule() {
      const response = await scheduleData.addSchedule(this.newSchedule)
      console.log(response)
      if (response != null) {
        this.schedules.push(response);
      }
      this.newSchedule.description = '';
      this.newSchedule.selectedDays.sunday = false;
      this.newSchedule.selectedDays.monday = false;
      this.newSchedule.selectedDays.tuesday = false;
      this.newSchedule.selectedDays.wednesday = false;
      this.newSchedule.selectedDays.thursday = false;
      this.newSchedule.selectedDays.friday = false;
      this.newSchedule.selectedDays.saturday = false;
    }
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme';

.task-list {
  display: flex;
  flex-direction: column;
  padding: 5px 5px 15px;
}

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

.schedule-heading {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid gray;
}

.schedule-item {
  display: flex;
  flex-direction: column;
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
