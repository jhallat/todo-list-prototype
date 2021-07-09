<template>
  <div class="day-display">
    <div class="day" :class="{ selected: selectedDays.sunday}">S</div>
    <div class="day" :class="{ selected: selectedDays.monday}">M</div>
    <div class="day" :class="{ selected: selectedDays.tuesday}">T</div>
    <div class="day" :class="{ selected: selectedDays.wednesday}">W</div>
    <div class="day" :class="{ selected: selectedDays.thursday}">T</div>
    <div class="day" :class="{ selected: selectedDays.friday}">F</div>
    <div class="day" :class="{ selected: selectedDays.saturday}">S</div>
  </div>
</template>

<script>
export default {
  name: 'DayDisplay',
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

<style>
.day-display {
  display: flex;
  flex-direction: row;
}
.day {
  color: #cccccc;
}

.selected {
  color: black;
}

</style>
