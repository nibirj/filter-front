<template>
  <div v-if="applicationState.nonModalModeOpen" class="container">
    <div class="card" ref="nonModalAdding">
      <div class="card-header d-flex">
        <input type="text" ref="name" class="form-control" id="stringInput" v-model="this.filterData.name" placeholder="Name here pls...">
        <button class="btn" @click="applicationState.nonModalModeOpen = !applicationState.nonModalModeOpen">
          <i class="bi bi-x-lg justify-content-center"></i>
        </button>
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
</template>

<script>
import Criterias from "@/shared/components/criterias/Criterias.vue";
import {FilterWithCriteriaDTO} from "@/shared/DTO/FilterWithCriteriaDTO.js";
import {addNewCriteria, resizeModal} from "@/shared/modalFunctionality/modalFunctionality.js";
import axios from "axios";
import {showNotification} from "@/shared/notifications/notificationFuntionality.js";
import {criteriasVerification, nameVerification} from "@/shared/dataVerify/filterVerification.js";
import {inject} from "vue";
import {FilterDTO} from "@/shared/DTO/FilterDTO.js";
export default {
  methods: {
    addNewCriteria,
    resizeModal,
    save() {
      axios.post(this.filterController, this.filterData).then(data => {
        this.updateRow(data)
        showNotification(this.notificationState, {
          message: "Filter created successfully.",
          type: "success"
        });
        this.areCriteriasEmpty = false
        this.$refs.name.classList.remove("is-invalid")
        this.applicationState.nonModalModeOpen = false
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
            message: "Server side problem.",
            type: "alert"
          });
        }
      })
    },
    updateRow(data) {
      this.filtersData.push(new FilterDTO(data.data.id, data.data.name))
    }
  },
  components: {Criterias},
  props: {
    filterData: {
      type: FilterWithCriteriaDTO,
      required: true
    },
  },
  data() {
    return {
      filtersData: inject("$applicationState").filtersList,
      areCriteriasEmpty: false,
      filterController: inject("$filterController"),
      notificationState: inject("$notificationState"),
      applicationState: inject("$applicationState")
    }
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