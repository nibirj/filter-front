<script>
import {CriteriaDTO} from "@/shared/DTO/CriteriaDTO.js";

export default {
  props: {
    titleCriteriaData: {
      type: CriteriaDTO,
      required: true
    }
  }
}
</script>

<template>
  <div class="col-4">
    <select v-model="this.titleCriteriaData.comparingCondition" class="form-select" aria-label="Default select example">
      <option value="Contains">Contains</option>
      <option value="Starts with">Starts with</option>
      <option value="Equal">Equal</option>
      <option value="Ends with">Ends with</option>
    </select>
  </div>
  <div class="col-4">
    <input type="text" class="form-control" id="stringInput" v-model="this.titleCriteriaData.comparableName" placeholder="Enter text">
  </div>
</template>

<style scoped>

</style>