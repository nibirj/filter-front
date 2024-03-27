<template>
  <div class="statistic w-100">
    <div class="row align-items-center">
      <div class="col-6 text-center">
        <p class="m-0">{{ this.filterData.name }}</p>
      </div>
      <div class="col-5 d-flex justify-content-start">

      </div>
      <div class="col-1" v-if="applicationState.modalMode">
        <button class="btn" @click="updateData(filterData.id)" data-bs-toggle="modal" data-bs-target="#filterModal">
          <i class="bi bi-pen"></i>
        </button>
      </div>
      <div class="col-1" v-if="!applicationState.modalMode">
        <button class="btn" @click="chevronState = !chevronState">
          <i v-if="chevronState" class="bi bi-chevron-down" />
          <i v-else class="bi bi-chevron-up" />
        </button>
      </div>
    </div>
  </div>
  <div v-if="chevronState && !applicationState.modalMode">
    <NonModalEditFilter :filter-id="filterData.id">
    </NonModalEditFilter>
  </div>
</template>

<script>

import NonModalEditFilter from "@/features/editFilterCriteriasFeature/NonModalEditFilter.vue";
import { FilterDTO } from "@/shared/DTO/FilterDTO.js";
import {inject} from "vue";

export default {
  components: {NonModalEditFilter},
  props: {
    filterData: {
      type: FilterDTO,
      required: true
    }
  },
  data() {
    return {
      applicationState: inject('$applicationState'),
      chevronState: false,
    };
  },
  methods: {
    updateData(filterId) {
      this.applicationState.chosenFilterId = filterId
    }
  },
};
</script>

<style scoped>
.statistic {
  background-color: #d9d9d9;
  width: 100%;
  text-align: start;
  color: #000000;
  border-radius: 5px;
  padding: 20px 20px;
  font-weight: bold;
  box-shadow: 0 3px 6px -1px rgba(0, 0, 0, 0.2);
}

.permissions {
  font-size: x-small;
}
</style>
