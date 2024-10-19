<template>
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <h4>Delete confirmation</h4>
        <p>Do you really want to delete the participant"{{ participant.name }}", "{{ participant.email }}"?</p>
        <div class="modal-footer">
          <ButtonComponent @click="confirmDelete" class="btn btn-danger">Yes</ButtonComponent>
          <ButtonComponent @click="cancelDelete" class="btn btn-secondary">No</ButtonComponent>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import ButtonComponent from "./ButtonComponent.vue";
  import { Participant } from '../models/Participant';
  
  export default defineComponent({
    name: "ConfirmDeleteModal",
    components: { ButtonComponent },
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      participant: {
        type: Object as () => Participant,
        required: true,
      }
    },
    emits: ["confirm", "cancel"],
    methods: {
      confirmDelete() {
        this.$emit("confirm");
      },
      cancelDelete() {
        this.$emit("cancel");
      }
    }
  });
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    text-align: center;
  }
  .modal-footer {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  </style>
  