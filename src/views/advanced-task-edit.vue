<template>
  <PageContent title="Advanced Edit">
    <div class="margin-left-small margin-top-large">
      <Group heading="Basic">
        <div class="ate-row margin-left-small margin-top-small">
          <input v-model="task.description" class="ate-input"/>
          <div class="margin-left-small">
            <CheckBox :selected="task.isOngoing" label="Ongoing"></CheckBox>
          </div>
          <div class="margin-left-small">
            <CheckBox :selected="task.isQuantifiable" label="Quantifiable"></CheckBox>
          </div>
        </div>
      </Group>
    </div>

    <div class="margin-left-small margin-top-large">
    <Group heading="Scheduling">
        <select v-model="task.scheduleType" class="ate-select margin-left-small margin-top-small">
          <option value="none">None</option>
          <option value="single">Single</option>
          <option value="weekly">Weekly</option>
          <option value="pool">Pool</option>
          <option value="round-robin">Round Robing</option>
        </select>
        <button :disabled="!scheduleSet" class="ate-button margin-left-small">Pause</button>
        <button :disabled="!scheduleSet" class="ate-button margin-left-small">Clear From Schedule</button>
      <div class="margin-left-small margin-top-small" v-if="task.scheduleType=='pool'">
        <label>Not implemented</label>
      </div>
      <div class="margin-left-small margin-top-small" v-if="task.scheduleType=='round-robin'">
        <label>Round Robin</label>
      </div>
      <div class="margin-left-small margin-top-small" v-if="task.scheduleType=='single'">
        <label>Do this on </label>
        <input class="ate-input" type="date">
      </div>
      <div class="ate-row margin-left-small margin-top-small" v-if="task.scheduleType=='weekly'">
        <div class="margin-right-small ate-day-input">
          <label class="margin-left-x-small" >Sun</label>
          <input class="ate-input" v-model="task.weeklySchedule.sunday"/>
        </div>
        <div class="margin-right-small ate-day-input">
          <label class="margin-left-x-small">Mon</label>
          <input class="ate-input" v-model="task.weeklySchedule.monday"/>
        </div>
        <div class="margin-right-small ate-day-input">
          <label class="margin-left-x-small">Tue</label>
          <input class="ate-input" v-model="task.weeklySchedule.tuesday"/>
        </div>
        <div class="margin-right-small ate-day-input">
          <label class="margin-left-x-small">Wed</label>
          <input class="ate-input" v-model="task.weeklySchedule.wednesday"/>
        </div>
        <div class="margin-right-small ate-day-input">
          <label class="margin-left-x-small">Thu</label>
          <input class="ate-input" v-model="task.weeklySchedule.thursday"/>
        </div>
        <div class="margin-right-small ate-day-input">
          <label class="margin-left-x-small">Fri</label>
          <input class="ate-input" v-model="task.weeklySchedule.friday"/>
        </div>
        <div class="margin-right-small ate-day-input">
          <label class="margin-left-x-small">Sat</label>
          <input class="ate-input" v-model="task.weeklySchedule.saturday"/>
        </div>
      </div>
    </Group>
    </div>

    <div class="margin-left-small margin-top-large">
      <Group heading="Notes">
        <textarea class="ate-input ate-notes margin-top-small margin-left-small margin-right-small" />
      </Group>
    </div>

    <div class="ate-button-bar">
      <button class="ate-button">Cancel</button>
      <button class="ate-button">Save</button>
    </div>
  </PageContent>
</template>

<script>
import PageContent from "@/components/page-content";
import CheckBox from "@/components/check-box";
import Group from "@/components/group";
import {TaskServiceFactory} from "@/shared/service/task-service";

export default {
  name: 'AdvancedEdit',
  data() {
    return {
      taskService: {},
      task: {}
    }
  },
  computed: {
    scheduleSet() {
      if (this.task.scheduleType === 'weekly') {
        if (this.task.weeklySchedule.sunday + '' !== '0') { return true }
        if (this.task.weeklySchedule.monday + '' !== '0') { return true }
        if (this.task.weeklySchedule.tuesday + '' !== '0') { return true }
        if (this.task.weeklySchedule.wednesday + '' !== '0') { return true }
        if (this.task.weeklySchedule.thursday + '' !== '0') { return true }
        if (this.task.weeklySchedule.friday + '' !== '0') { return true }
        if (this.task.weeklySchedule.saturday + '' !== '0') { return true }
      }
      return false;
    }
  },
  props: {
    id: Number
  },
  components: {Group, PageContent, CheckBox},
  async created() {
    this.taskService = TaskServiceFactory.getInstance();
    this.task = await this.taskService.getTask(this.id);
  },
  methods: {

  }
}
</script>

<style lang="scss">
@import "../shared/style/theme";

.ate-select {
  @include primary-input();
}

.ate-button-bar {
  display: flex;
  flex-direction: row;
  justify-content: right;
  padding: 10px;
}

.ate-button {
  @include primary-button();
}

.ate-input {
  @include primary-input;
}

.ate-day-input {
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 50px;
}

.ate-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.ate-notes {
  width: 98%;
  height: 200px;
  resize: none;
}

</style>
