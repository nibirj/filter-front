<template>
  <div class="container" v-if="!loading">
    <div class="card" ref="nonModalAdding">
      <div class="card-header d-flex">
        <input type="text" ref="name" class="form-control" id="stringInput" v-model="this.filterData.name" placeholder="Name here pls...">
      </div>
      <div class="card-body overflow-auto">
        <div class="container" style="overflow: hidden">
          <ul>
            <li v-for="criteria in filterData.criteriaDTOList" :key="criteria">
              <div class="row m-lg-2">
                <Criterias
                    :filter-with-criteria="filterData"
                    :criteria-data="criteria"></Criterias>
              </div>
            </li>
          </ul>
          <div v-if="areCriteriasEmpty" class="alert alert-danger text-center">
            Criterias should not be empty
          </div>
        </div>
        <div class="text-center">
          <button @click="addNewCriteria(this.filterData.criteriaDTOList)" type="button" class="btn btn-primary m-1">Add Criteria</button>
          <button @click="save" type="button" class="btn btn-primary">Save filter</button>
        </div>
        <div class="resize-handle-lower" @mousedown="resizeModal($event, 1, this.$refs.nonModalAdding)"></div>
      </div>
    </div>
  </div>
  <div v-else>
    Loading for data
  </div>
</template>

<script>
import Criterias from "@/shared/components/criterias/Criterias.vue";
import {inject} from "vue";
import axios from "axios";
import {AmountCriteriaDTO} from "@/shared/DTO/AmountCriteriaDTO.js";
import {TitleCriteriaDTO} from "@/shared/DTO/TitleCriteriaDTO.js";
import {DateCriteriaDTO} from "@/shared/DTO/DateCriteriaDTO.js";
import {FilterWithCriteriaDTO} from "@/shared/DTO/FilterWithCriteriaDTO.js";
import {addNewCriteria, resizeModal} from "@/shared/modalFunctionality/modalFunctionality.js";
import {showNotification} from "@/shared/notifications/notificationFuntionality.js";
import {criteriasVerification, nameVerification} from "@/shared/dataVerify/filterVerification.js";
import {FilterDTO} from "@/shared/DTO/FilterDTO.js";

export default {
  props: {
    filterId: {
      type: Number,
      required: true
    }
  },
  components: { Criterias },
  data() {
    return {
      filterData: null,
      areCriteriasEmpty: false,
      loading: true,
      filterController: inject("$filterController"),
      notificationState: inject("$notificationState"),
      applicationState: inject("$applicationState"),
      filtersData: inject("$applicationState").filtersList
    }
  },
  mounted() {
    this.getById();
  },
  methods: {
    addNewCriteria,
    resizeModal,
    save() {
      axios.put(this.filterController, this.filterData)
          .then(data => {
            this.updateRow(data);
            this.$refs.name.classList.remove("is-invalid")
            this.areCriteriasEmpty = criteriasVerification(this.filterData.criteriaDTOList);
            showNotification(this.notificationState, {
              message: "Filter updated successfully.",
              type: "success"
            });
          }).catch(error => {
            if (error.response.status === 422) {
              this.areCriteriasEmpty = criteriasVerification(this.filterData.criteriaDTOList);
              nameVerification(this.filterData.name, this.$refs.name)
              showNotification(this.notificationState, {
                message: "Filter is not valid.",
                type: "alert"
              });
            } else {
              showNotification(this.notificationState, {
                message: "Server side error.",
                type: "alert"
              });
            }
      })
    },
    getById() {
      this.loading = true;
      axios.get(this.filterController + "/" + this.filterId).then(data => {
        this.criterias = data.data.criterias.map(data => {
          switch (data.type) {
            case 'Amount':
              return new AmountCriteriaDTO(data.id, data.type, data.comparingCondition, data.comparableValue);
            case 'Title':
              return new TitleCriteriaDTO(data.id, data.type, data.comparingCondition, data.comparableName);
            case 'Date':
              return new DateCriteriaDTO(data.id, data.type, data.comparingCondition, data.comparableDate)
            default:
              throw new Error('Unknown type');
          }
        })
        this.filterData = new FilterWithCriteriaDTO(data.data.id, data.data.name, this.criterias);
        this.loading = false;
      })
    },
    updateRow(data) {
      const index = this.filtersData.findIndex(element => element.id === this.filterData.id);
      if (index !== -1) {
        this.filtersData.splice(index, 1);
        this.filtersData.splice(index, 0, new FilterDTO(data.data.id, data.data.name))
      }
    },
  }
}
</script>

<style scoped>
.resize-handle-lower {
  position: absolute;
  width: 100%;
  height: 10px;
  cursor: ns-resize;
  bottom: -5px;
  left: 0;
  background: transparent;
}
</style>