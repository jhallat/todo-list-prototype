<template>
  <PageContent title="Schedule">
    <div class="goal-selection margin-left-small margin-top-small sch-row">
      <label class="margin-right-small">Range</label>
      <input class="sch-input" type="date" v-model="start">
      <div class="margin-left-small margin-right-small">to</div>
      <input class="sch-input" type="date" v-model="end">
      <button class="sch-button margin-left-small" @click="loadSchedule">Show Schedule</button>
    </div>
    <div v-for="(schedule) in schedules" :key="schedule.day">
    <Group class="margin-left-small margin-top-large" :heading="schedule.day">
      <div class="sch-container">
      <div class="sch-row sch-editable"
           v-for="(task) in schedule.scheduledTasks"
           :key="task.taskId"
           @click = "onEdit(task.taskId)"
           :class="{ 'sch-paused': task.paused }">
        <QualifiedLabel :description="task.description" :quantity="task.quantity" />
      </div>
      </div>
    </Group>
    </div>
  </PageContent>
</template>

<script>
import {ScheduleData} from '../shared';
import PageContent from "@/components/page-content";
import Group from "@/components/group";
import QualifiedLabel from "@/components/quantified-label";

export default {
  name: 'Schedule',
  components: {PageContent, Group, QualifiedLabel},
  data() {
    return {
      start: '',
      end: '',
      schedules: []
    }
  },
  methods: {
    async loadSchedule() {
      this.schedules = await ScheduleData.getSchedules(this.start, this.end);
    },
    onEdit(taskId) {
      this.$router.push({name: 'advanced-edit', params: {id: taskId }});
    }
   }
}
</script>

<style lang="scss">
@import '../shared/style/theme';

.sch-input {
  @include primary-input;
}

.sch-button {
  @include primary-button;
}

.sch-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 10px 10px 10px;
}

.sch-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  height: 25px;
}

.sch-paused {
  color: gray;
}

.sch-editable {
  &:hover {
    color: $primary-color;
    text-decoration: underline;
    cursor: pointer;
  }
}

</style>
