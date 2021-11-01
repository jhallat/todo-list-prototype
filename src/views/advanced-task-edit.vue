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
      <div class="ate-row margin-left-small margin-top-small">
        <select v-model="task.schedule.scheduleType" class="ate-select" @change="onSelectScheduleType()">
          <option value="NONE">None</option>
          <option value="DAILY">Single</option>
          <option value="WEEKLY">Weekly</option>
          <option value="POOL">Pool</option>
          <option value="ROUND-ROBIN">Round Robin</option>
        </select>
        <div class="margin-left-small">
          <CheckBox :selected="task.schedule.paused" label="Pause" @select="togglePause"></CheckBox>
        </div>
      </div>
      <div class="margin-left-small margin-top-small" v-if="task.schedule.scheduleType=='POOL'">
        <label>Not implemented</label>
      </div>
      <div class="margin-left-small margin-top-small" v-if="task.schedule.scheduleType=='ROUND-ROBIN'">
        <label>Not implemented</label>
      </div>
      <div class="margin-left-small margin-top-small" v-if="task.schedule.scheduleType=='DAILY'">
        <label>Do this on </label>
        <input class="ate-input" v-model="task.schedule.daily.day" type="date">
      </div>
      <div class="ate-row margin-left-small margin-top-small" v-if="task.schedule.scheduleType=='WEEKLY'">
        <div class="margin-right-small ate-day-input">
          <label class="margin-left-x-small" >Sun</label>
          <input class="ate-input" v-model="task.schedule.weekly.sunday"/>
        </div>
        <div class="margin-right-small ate-day-input">
          <label class="margin-left-x-small">Mon</label>
          <input class="ate-input" v-model="task.schedule.weekly.monday"/>
        </div>
        <div class="margin-right-small ate-day-input">
          <label class="margin-left-x-small">Tue</label>
          <input class="ate-input" v-model="task.schedule.weekly.tuesday"/>
        </div>
        <div class="margin-right-small ate-day-input">
          <label class="margin-left-x-small">Wed</label>
          <input class="ate-input" v-model="task.schedule.weekly.wednesday"/>
        </div>
        <div class="margin-right-small ate-day-input">
          <label class="margin-left-x-small">Thu</label>
          <input class="ate-input" v-model="task.schedule.weekly.thursday"/>
        </div>
        <div class="margin-right-small ate-day-input">
          <label class="margin-left-x-small">Fri</label>
          <input class="ate-input" v-model="task.schedule.weekly.friday"/>
        </div>
        <div class="margin-right-small ate-day-input">
          <label class="margin-left-x-small">Sat</label>
          <input class="ate-input" v-model="task.schedule.weekly.saturday"/>
        </div>
        <div class="margin-left-medium ate-day-input">
          <label class="margin-left-x-small">Max</label>
          <input class="ate-input" v-model="task.schedule.weekly.max"/>
        </div>
      </div>
    </Group>
    </div>

    <div class="margin-left-small margin-top-large">
      <Group heading="Notes">
        <textarea v-model="task.notes" class="ate-input ate-notes margin-top-small margin-left-small margin-right-small" />
      </Group>
    </div>

    <div class="ate-button-bar">
      <button class="ate-button">Cancel</button>
      <button class="ate-button" @click="saveTask()">Save</button>
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
      task: {
        schedule: {
          scheduleType: 'NONE'
        }
      }
    }
  },
  computed: {
    scheduleSet() {
      if (this.task && this.task?.schedule?.scheduleType === 'WEEKLY') {
        if (this.task.schedule.weekly.sunday + '' !== '0') { return true }
        if (this.task.schedule.weekly.monday + '' !== '0') { return true }
        if (this.task.schedule.weekly.tuesday + '' !== '0') { return true }
        if (this.task.schedule.weekly.wednesday + '' !== '0') { return true }
        if (this.task.schedule.weekly.thursday + '' !== '0') { return true }
        if (this.task.schedule.weekly.friday + '' !== '0') { return true }
        if (this.task.schedule.weekly.saturday + '' !== '0') { return true }
      }
      if (this.task && this.task?.schedule?.scheduleType === 'DAILY') {
        return  this.task.schedule.daily.day !== undefined &&
                this.task.schedule.daily.day != null
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
    async saveTask() {
      await this.taskService.updateTask(this.task);
    },
    togglePause() {
      this.task.schedule.paused = !this.task.schedule.paused
    },
    onSelectScheduleType() {
      console.log("select schedule type called");
      if (this.task?.schedule?.scheduleType === 'WEEKLY') {
        if (this.task.schedule.weekly === undefined || this.task.schedule.weekly == null) {
          this.task.schedule.weekly = {
            sunday: 0,
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0
          }
        }
      }
      if (this.task?.schedule?.scheduleType === 'DAILY') {
        if (this.task.schedule.daily === undefined || this.task.schedule.daily == null) {
          this.task.schedule.daily = {
            day: null,
            quantity: 1
          }
        }
      }
    }
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
