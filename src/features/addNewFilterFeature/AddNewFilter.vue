<template>
  <div class="modal fade" ref="addNewFilterModal" id="addNewFilterModal" tabindex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" >
      <div class="modal-content" ref="modalDialog">
        <div class="resize-handle-upper" @mousedown="resizeModal($event, -2.2, this.$refs.modalDialog)"></div>
        <div class="modal-header">
          <input type="text" ref="name" class="form-control" id="stringInput" v-model="this.filterData.name" placeholder="Name here pls...">
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
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
          <div class="text-center">
            <button @click="addNewCriteria(this.filterData.criteriaDTOList)" type="button" class="btn btn-primary">Add Criteria</button>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          <button @click="save" type="button" class="btn btn-primary">Save changes</button>
          <div class="resize-handle-lower" @mousedown="resizeModal($event, 2, this.$refs.modalDialog)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Criterias from "@/shared/components/criterias/Criterias.vue";
import {inject} from "vue";
import {FilterWithCriteriaDTO} from "@/shared/DTO/FilterWithCriteriaDTO.js";
import axios from "axios";
import Notification from "@/shared/notifications/Notification.vue";
import { Modal } from 'bootstrap';
import { criteriasVerification, nameVerification } from "@/shared/dataVerify/filterVerification.js";
import { addNewCriteria, resizeModal} from "@/shared/modalFunctionality/modalFunctionality.js";
import { showNotification } from "@/shared/notifications/notificationFuntionality.js";
import {FilterDTO} from "@/shared/DTO/FilterDTO.js";
export default {
  components: { Notification, Criterias, Modal},
  props: {
    filterData: {
      type: FilterWithCriteriaDTO,
      required: true
    }
  },
  data() {
    return {
      notificationMessage: "",
      criterias: [],
      filterController: inject("$filterController"),
      modal: null,
      areCriteriasEmpty: false,
      filtersData: inject("$applicationState").filtersList,
      notificationState: inject("$notificationState"),
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.addNewFilterModal);
  },
  methods: {
    resizeModal,
    addNewCriteria,
    save() {
      axios.post(this.filterController, this.filterData).then(data => {
        this.updateRow(data)
        showNotification(this.notificationState, {
          message: "Filter created successfully.",
          type: "success"
        });
        this.closeModal()
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
    closeModal() {
      this.modal.hide()
      this.areCriteriasEmpty = false
      this.$refs.name.classList.remove("is-invalid")
    },
    updateRow(data) {
      this.filtersData.push(new FilterDTO(data.data.id, data.data.name))
    }
  }
}
</script>

<style scoped>
.resize-handle-upper {
  position: absolute;
  width: 100%;
  height: 10px;
  cursor: ns-resize;
  left: 0;
  background: transparent;
}

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