<template>
  <AddNewFilter :filter-data="newFilter" :filters-data="filtersData"></AddNewFilter>
  <FilterModal :filter-id="chosenFilterId" :filters-data="filtersData"></FilterModal>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col" class="col-3">#</th>
        <th scope="col" class="col-3">Name</th>
        <th scope="col" class="col-3"></th>
        <th scope="col" class="col-3">
          <button @click="createFilter" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewFilterModal">
            Add new Filter
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(filter, index) in this.filtersData">
        <th scope="row">{{ index }}</th>
        <td> {{ filter.name }}</td>
        <td>
          <button @click="updateData(filter.id)" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#filterModal">
            Edit filter
          </button>
        </td>
        <td>
          <button @click="deleteFilter(filter.id)" type="button" class="btn btn-primary">
            Delete filter
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import FilterModal from "@/features/editFilterCriteriasFeature/EditFilter.vue";
import {inject} from "vue";
import axios from "axios";
import AddNewFilter from "@/features/addNewFilterFeature/AddNewFilter.vue";
import {FilterWithCriteriaDTO} from "@/shared/DTO/FilterWithCriteriaDTO.js";
import {AmountCriteriaDTO} from "@/shared/DTO/AmountCriteriaDTO.js";
import Notification from "@/shared/notifications/Notification.vue";
import {showNotification} from "@/shared/notifications/notificationFuntionality.js";

export default {
  components: {Notification, AddNewFilter, FilterModal },
  data() {
    return {
      filtersData: [],
      chosenFilterId: 0,
      filterController: inject("$filterController"),
      newFilter: new FilterWithCriteriaDTO(null, "", [
          new AmountCriteriaDTO(null, "Amount", "More", 0)
      ]),
      notificationState: inject("$notificationState"),
    };
  },
  mounted() {
    axios.get(this.filterController + "/filters").then(data => {
      this.filtersData = data.data
    })
  },
  methods: {
    updateData(filterId) {
      this.chosenFilterId = filterId;
    },
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
    }
  }
}
</script>

<style scoped>
</style>