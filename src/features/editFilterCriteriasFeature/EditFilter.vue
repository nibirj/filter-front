<template>
  <div class="modal fade" ref="editFilterModal" id="filterModal" tabindex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" >
      <div class="modal-content" ref="modalDialog">
        <div class="resize-handle-upper" @mousedown="resizeModal($event, -2.2, this.$refs.modalDialog)"></div>
        <div class="modal-header">
          <h5  class="modal-title m-1" id="filterModalLabel">
            Name
          </h5>
          <input v-if="!loading" ref="name" type="text" class="form-control" id="stringInput" v-model="this.filterData.name" :placeholder="this.filterData.name">
          <button @click="closeModal" type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div v-if="!loading" class="modal-body">
            <ul>
              <li v-for="criteria in filterData.criteriaDTOList" :key="criteria">
                <div class="row m-lg-2">
                  <Criterias
                      :filter-with-criteria="filterData"
                      :criteria-data="criteria">
                  </Criterias>
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
        <div v-if="loading" class="modal-body">
          <h1>loading for {{this.filterId}}</h1>
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
import {inject} from "vue";
import Criterias from "@/shared/components/criterias/Criterias.vue";
import axios from "axios";
import {AmountCriteriaDTO} from "@/shared/DTO/AmountCriteriaDTO.js";
import {TitleCriteriaDTO} from "@/shared/DTO/TitleCriteriaDTO.js";
import {DateCriteriaDTO} from "@/shared/DTO/DateCriteriaDTO.js";
import {FilterWithCriteriaDTO} from "@/shared/DTO/FilterWithCriteriaDTO.js";
import Notification from "@/shared/notifications/Notification.vue";
import {criteriasVerification, nameVerification} from "@/shared/dataVerify/filterVerification.js";
import {addNewCriteria, resizeModal} from "@/shared/modalFunctionality/modalFunctionality.js";
import {Modal} from "bootstrap";
import {showNotification} from "@/shared/notifications/notificationFuntionality.js";
import {FilterDTO} from "@/shared/DTO/FilterDTO.js";
export default {
  components: {Notification, Criterias},
  props: {
    filterId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      notificationMessage: "",
      areCriteriasEmpty: false,
      loading: true,
      filterData: null,
      criterias: [],
      modal: null,
      filterController: inject("$filterController"),
      notificationState: inject("$notificationState"),
      filtersData: inject("$applicationState").filtersList
    };
  },
  watch: {
    filterId: {
      handler() {
        this.getById();
      }
    }
  },
  mounted() {
    this.modal = new Modal(this.$refs.editFilterModal);
  },
  methods: {
    addNewCriteria,
    resizeModal,
    save() {
      axios.put(this.filterController, this.filterData)
          .then(data => {
            this.updateRow(data);
            showNotification(this.notificationState, {
              message: "Filter updated successfully.",
              type: "success"
            });
            this.closeModal();
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
    closeModal() {
      this.modal.hide()
      this.areCriteriasEmpty = false
      this.$refs.name.classList.remove("is-invalid")
    },
    updateRow(data) {
      const index = this.filtersData.findIndex(element => element.id === this.filterData.id);
      if (index !== -1) {
        this.filtersData.splice(index, 1);
        this.filtersData.splice(index, 0, new FilterDTO(data.data.id, data.data.name))
      }
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
    }
  },
};
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