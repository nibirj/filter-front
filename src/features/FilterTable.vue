<template>
  <AddNewFilter :filter-data="newFilter"></AddNewFilter>
  <FilterModal :filter-id="applicationState.chosenFilterId"></FilterModal>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col" class="col-3">#</th>
        <th scope="col" class="col-3">Name</th>
        <th scope="col" class="col-3">
          <div class="form-check form-switch d-flex justify-content-center">
            <input @click="switchModeAndRemoveChosenFilter" class="form-check-input m-1" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
            <h6 v-if="applicationState.modalMode">Modal mode</h6>
            <h6 v-if="!applicationState.modalMode">Non modal mode</h6>
          </div>
        </th>
        <th scope="col" class="col-3">
        </th>
      </tr>
    </thead>
    <tbody>
      <tr  v-for="(filter, index) in this.filtersData">
        <th scope="row" class="align-content-center">{{ index }}</th>
        <td colspan="2">
          <FilterChevron
              :filter-data="filter">
          </FilterChevron>
        </td>
        <td class="align-content-center">
          <button @click="deleteFilter(filter.id)" type="button" class="btn btn-primary">
            Delete filter
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <button v-if="applicationState.modalMode" @click="createFilter" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewFilterModal">
    Add new Filter
  </button>
  <NonModalAddNewFilter
      v-if="!applicationState.modalMode"
      :filter-data="newFilter">
  </NonModalAddNewFilter>
  <button v-if="!applicationState.modalMode && !this.applicationState.nonModalModeOpen" @click="() => {
    this.createFilter()
    this.applicationState.nonModalModeOpen = true
  }" type="button" class="btn btn-primary">
    Add new Filter
  </button>
</template>

<script>
import FilterChevron from "@/features/FilterChevron.vue";
import FilterModal from "@/features/editFilterCriteriasFeature/EditFilter.vue";
import { inject } from "vue";
import axios from "axios";
import AddNewFilter from "@/features/addNewFilterFeature/AddNewFilter.vue";
import {FilterWithCriteriaDTO} from "@/shared/DTO/FilterWithCriteriaDTO.js";
import {AmountCriteriaDTO} from "@/shared/DTO/AmountCriteriaDTO.js";
import Notification from "@/shared/notifications/Notification.vue";
import {showNotification} from "@/shared/notifications/notificationFuntionality.js";
import NonModalAddNewFilter from "@/features/addNewFilterFeature/NonModalAddNewFilter.vue";
import NonModalEditFilter from "@/features/editFilterCriteriasFeature/NonModalEditFilter.vue";
import {FilterDTO} from "@/shared/DTO/FilterDTO.js";

export default {
  components: {NonModalEditFilter, NonModalAddNewFilter, Notification, AddNewFilter, FilterModal , FilterChevron},
  data() {
    return {
      nonModalViewOpen: false,
      filterController: inject("$filterController"),
      newFilter: new FilterWithCriteriaDTO(null, "", [
          new AmountCriteriaDTO(null, "Amount", "More", 0)
      ]),
      notificationState: inject("$notificationState"),
      applicationState: inject('$applicationState'),
      filtersData: inject("$applicationState").filtersList
    };
  },
  mounted() {
    axios.get(this.filterController + "/filters").then(data => {
      data.data.forEach(e => {
        this.filtersData.push(new FilterDTO(e.id, e.name))
      })
    })
  },
  methods: {
    inject,
    deleteFilter(filterId) {
      axios.delete(this.filterController + "/" + filterId).then(data => {
        this.updateRow(filterId);
        showNotification(this.notificationState, {
          message: "Filter deleted successfully",
          type: "success"
        });
      }).catch(e => {
        showNotification(this.notificationState, {
          message: "Server side error",
          type: "alert"
        });
      })
    },
    updateRow(filterId) {
      const index = this.filtersData.findIndex(element => element.id === filterId);
      if (index !== -1) {
        this.filtersData.splice(index, 1);
      }
    },
    createFilter() {
      this.newFilter = new FilterWithCriteriaDTO(null, "", [
        new AmountCriteriaDTO(null, "Amount", "More", 0)
      ])
    },
    switchModeAndRemoveChosenFilter() {
      this.applicationState.chosenFilterId = 0
      this.applicationState.modalMode = !this.applicationState.modalMode
    }
  }
}
</script>

<style scoped>
</style>