<script>
import {CriteriaDTO} from "@/shared/DTO/CriteriaDTO.js";

export default {
  props: {
    dateCriteriaData: {
      type: CriteriaDTO,
      required: true
    }
  },
  data() {
    return {
      selectedDate: ''
    };
  },
}
</script>

<template>
  <div class="col-4">
    <select v-model="this.dateCriteriaData.comparingCondition" class="form-select" aria-label="Default select example">
      <option value="From">From</option>
      <option value="Until">Until</option>
      <option value="Exactly">Exactly</option>
    </select>
  </div>
  <div class="col-4">
    <input type="date" id="datepicker" class="form-control" v-model="this.dateCriteriaData.comparableDate">
  </div>
</template>

<style scoped>

</style>