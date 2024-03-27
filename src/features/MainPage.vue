<script>
import FilterTable from "@/features/FilterTable.vue";
import Notification from "@/shared/notifications/Notification.vue";
import {inject} from "vue";
export default {
  components: {FilterTable, Notification},
  data() {
    return {
      notifications: inject("$notificationState")
    }
  }
}
</script>

<template>
  <div class="h-100 text-center">
    <div class="toast-container position-fixed bottom-0 end-0 p-3" ref="container" >
      <Notification :type="test.type" :message="test.message" v-for="test in notifications.slice().reverse()"></Notification>
    </div>
    <FilterTable></FilterTable>
  </div>
</template>

<style scoped>

</style>