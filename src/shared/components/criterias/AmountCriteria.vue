<script>
import {CriteriaDTO} from "@/shared/DTO/CriteriaDTO.js";

export default {
  props: {
    amountCriteriaData: {
      type: CriteriaDTO,
      required: true
    }
  }
}
</script>

<template>
  <div class="col-4">
    <select v-model="this.amountCriteriaData.comparingCondition" class="form-select" aria-label="Default select example">
      <option value="More">More</option>
      <option value="Less">Less</option>
      <option value="Equal">Equal</option>
    </select>
  </div>
  <div class="col-4">
    <input type="number" class="form-control" id="numericInput" v-model="this.amountCriteriaData.comparableValue" placeholder="Enter a number">
  </div>
</template>

<style scoped>

</style>