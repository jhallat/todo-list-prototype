<template>
  <span>{{ generateLabel(description, quantity) }}</span>
</template>

<script>
export default {
  name: 'QualifiedLabel',
  props: {
    description: {
      description: String,
      required: true
    },
    quantity: {
      description: Number,
      required: true
    }
  },
  methods: {
    generateLabel(description, quantity) {
      let labelQuantity = quantity;
      if (quantity < 1) {
        labelQuantity = 1;
      }
      if (description.includes('#')) {
        const temp = description.replace('#', labelQuantity);
        if (temp.includes(`(s)`)) {
          if (labelQuantity == 1) {
            return temp.replace(`(s)`, '');
          } else {
            return temp.replace(`(s)`, 's');
          }
        } else {
          return temp;
        }
      } else {
        if (labelQuantity == 1) {
          return description;
        }
        return `${labelQuantity} ${description}`
      }
    }
  }
}
</script>

<style>

</style>

