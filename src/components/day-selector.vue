<template>
  <div class="day-selector">
    <div class="day-selector-column">
      <div>S</div>
      <input type="checkbox" v-model="selectedDays.sunday"/>
    </div>
    <div class="day-selector-column">
      <div>M</div>
      <input type="checkbox" v-model="selectedDays.monday"/>
    </div>
    <div class="day-selector-column">
      <div>T</div>
      <input type="checkbox" v-model="selectedDays.tuesday"/>
    </div>
    <div class="day-selector-column">
      <div>W</div>
      <input type="checkbox" v-model="selectedDays.wednesday"/>
    </div>
    <div class="day-selector-column">
      <div>T</div>
      <input type="checkbox" v-model="selectedDays.thursday"/>
    </div>
    <div class="day-selector-column">
      <div>F</div>
      <input type="checkbox" v-model="selectedDays.friday"/>
    </div>
    <div class="day-selector-column">
      <div>S</div>
      <input type="checkbox" v-model="selectedDays.saturday"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DaySelector',
  props: {
    selectedDays: {
      type: Object,
      default: () => {
        return  {
          sunday: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false
        }
      }
    }
  }
}
</script>

<style lang="scss">
.day-selector {
  display: flex;
  flex-direction: row;
  padding-left: 15px;
  padding-right: 15px;
}

.day-selector-column {
  padding-right: 3px;
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
}
</style>
