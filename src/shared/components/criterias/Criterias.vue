<template>
  <div class="row">
    <div class="col-3">
      <select @change="updateData()" v-model="this.criteriaData.type" class="form-select" aria-label="Default select example">
        <option value="Amount">Amount</option>
        <option value="Title">Title</option>
        <option value="Date">Date</option>
      </select>
    </div>
    <AmountCriteria :key="this.criteriaData.type" v-if="this.criteriaData.type === 'Amount'" :amount-criteria-data="criteriaData"></AmountCriteria>
    <TitleCriteria :key="this.criteriaData.type" v-if="this.criteriaData.type === 'Title'" :title-criteria-data="criteriaData"></TitleCriteria>
    <DateCriteria :key="this.criteriaData.type" v-if="this.criteriaData.type === 'Date'" :date-criteria-data="criteriaData"></DateCriteria>
    <div class="col-1 text-center">
      <button @click="deleteCriteria" class="btn">
        <i class="bi bi-x"></i>
      </button>
    </div>
  </div>
</template>

<script>
import AmountCriteria from "@/shared/components/criterias/AmountCriteria.vue";
import TitleCriteria from "@/shared/components/criterias/TitleCriteria.vue";
import DateCriteria from "@/shared/components/criterias/DateCriteria.vue";
import {FilterWithCriteriaDTO} from "@/shared/DTO/FilterWithCriteriaDTO.js";
import {CriteriaDTO} from "@/shared/DTO/CriteriaDTO.js";
import {AmountCriteriaDTO} from "@/shared/DTO/AmountCriteriaDTO.js";
import {TitleCriteriaDTO} from "@/shared/DTO/TitleCriteriaDTO.js";
import {DateCriteriaDTO} from "@/shared/DTO/DateCriteriaDTO.js";

export default {
  components: {DateCriteria, TitleCriteria, AmountCriteria},
  props: {
    filterWithCriteria: {
      type: FilterWithCriteriaDTO,
      required: true
    },
    criteriaData: {
      type: CriteriaDTO,
      required: true
    }
  },
  data() {
    return {
      selectedCriteriaData: this.criteriaData.type
    }
  },
  methods: {
    deleteCriteria() {
      const copy = this.filterWithCriteria.criteriaDTOList;
      let indexToRemove = copy.findIndex(obj => obj === this.criteriaData);
      if (indexToRemove !== -1) {
        copy.splice(indexToRemove, 1);
      }
      this.filterWithCriteria.criteriaDTOList = copy
    },
    updateData() {
      const copy = this.filterWithCriteria.criteriaDTOList;
      let indexToRemove = copy.findIndex(obj => obj === this.criteriaData);
      if (indexToRemove !== -1) {
        copy.splice(indexToRemove, 1);
        if (this.criteriaData.type === 'Amount') {
          copy.splice(indexToRemove, 0, new AmountCriteriaDTO(null, "Amount", "More", 0));
        } else if (this.criteriaData.type === 'Title') {
          copy.splice(indexToRemove, 0, new TitleCriteriaDTO(null, "Title", "Contains", ""));
        } else if (this.criteriaData.type === 'Date') {
          copy.splice(indexToRemove, 0, new DateCriteriaDTO(null, "Date", "From", ""));
        }
      }
      this.filterWithCriteria.criteriaDTOList = copy
    }
  }
}
</script>

<style scoped>
</style>