<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="modal-container">
      <div class="modal-close" @click="closeModal"></div>
      <div class="modal">
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    emits: ['close'],
    setup(props, { emit }) {
      function closeModal() {
        emit('close');
      }
  
      return {
        closeModal
      };
    },
  });
  </script>
  
  <style scoped>
  .modal-container {
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
  
  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
  }
  </style>
  
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
  }
  .modal-header,
  .modal-footer {
    margin-bottom: 20px;
  }
  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  </style>
  