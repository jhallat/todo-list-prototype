<template>
  <div class="tke-container">
    <input class="tke-input" v-model="task.description" @keypress="onSubmit"/>
    <div class="margin-left-small">
      <CheckBox :selected="task.isOngoing" label="Ongoing" @select="toggleOngoing()"></CheckBox>
    </div>
    <div class="margin-left-small">
      <CheckBox :selected="task.isQuantifiable" label="Quantifiable" @select="toggleQuantifiable()"></CheckBox>
    </div>
    <button v-if="add" class="tke-button margin-left-small" @click="onAddItem" :disabled="isEditInvalid">Add</button>
    <button v-if="edit" class="tke-button margin-left-small" @click="onEditItem" :disabled="isEditInvalid">Edit</button>
    <button v-if="edit" class="tke-button margin-left-small" @click="onCancel" >Cancel</button>
  </div>
</template>

<script>
import CheckBox from "@/components/check-box";
export default {
  name: 'TaskEdit',
  components: {CheckBox},
  computed: {
    isEditInvalid() {
      return this.task === undefined || this.task.description.trim().length === 0;
    },
    add() {
      return this.editMode !== 'edit';
    },
    edit() {
      return this.editMode === 'edit';
    }
  },
  props: {
    task: {
      default: () => {
        return {
          description: '',
          isQuantifiable: false,
          isOngoing: false
        }
      },
    },
    editMode: {
      default: () => {
        return 'add';
      }
    }
  },
  methods: {
    onSubmit(event) {
      if (event.keyCode === 13 && this.task !== undefined && this.task.description.trim().length > 0) {
        if (this.editMode === 'add') {
          this.onAddItem();
        }
        if (this.editMode == 'edit') {
          this.onEditItem();
        }
      }
    },
    toggleOngoing() {
      this.task.isOngoing = !this.task.isOngoing;
    },
    toggleQuantifiable() {
      this.task.isQuantifiable = !this.task.isQuantifiable;
    },
    onAddItem() {
      this.$emit('add', {...this.task});
    },
    onEditItem() {
      this.$emit('edit', {...this.task});
    },
    onCancel() {
      this.$emit('cancel');
    },
  }
}
</script>

<style lang="scss">
@import '../shared/style/theme';

.tke-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.tke-input {
  @include primary-input;
}

.tke-button {
  @include primary-button;
}

</style>
