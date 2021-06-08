<template>
  <div class="group-container">
    <div class="group-container-heading">Groups</div>
    <input class="bottom-margin-medium" v-model="newItem" @keypress="onAddItemEnter"/>
    <button class="left-margin-small" @click="onAddItem" :disabled="isAddInvalid">Add</button>
  </div>
</template>

<script>
export default {
  name: 'Group',
  components: {

  },
  computed: {
    isAddInvalid() {
      return this.newItem == undefined || this.newItem.trim().length == 0;
    }
  },
  data() {
    return {
      newItem: '',
      groups: []
    }
  },
  methods: {
    onAddItem() {

    }
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme.scss';

.group-container {
  @include container(350px);
  text-align: left;
}

.group-container-heading {
  @include container-heading;
}
</style>