<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
}
</script>

<template>
  <div class="show toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <strong class="me-auto">
        <i v-if="type==='success'" class="bi bi-check2-circle"></i>
        <i v-else class="bi bi-x-square-fill"></i>
      </strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      {{ this.message }}
    </div>
  </div>
</template>

<style scoped>

</style>