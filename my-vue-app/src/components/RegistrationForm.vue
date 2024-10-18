<template>
  <form @submit.prevent="onSubmit" novalidate>
    <InputField
      v-model="localParticipant.name"
      label="Name"
      placeholder="Enter user name"
      :error="nameError"
    />
    <InputField
      v-model="localParticipant.dateOfBirth"
      type="date"
      label="Date of Birth"
      :max="today"
      :error="dateError"
    />
    <InputField
      v-model="localParticipant.email"
      type="email"
      label="Email"
      placeholder="Enter email"
      :error="emailError"
    />
    <InputField
      v-model="localParticipant.phoneNumber"
      type="tel"
      label="Phone number"
      placeholder="Enter phone number"
      :error="phoneError"
    />
    <ButtonComponent type="btn-primary">Save</ButtonComponent>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import InputField from "../components/InputComponent.vue";
import ButtonComponent from "../components/ButtonComponent.vue";
import { Participant } from "../models/Participant";  

export default defineComponent({
  name: "RegistrationForm",
  components: { InputField, ButtonComponent },
  props: {
    newParticipant: {
      type: Object as () => Participant,
      required: true,
    },
    nameError: String,
    dateError: String,
    emailError: String,
    phoneError: String,
    today: String,
  },
  emits: ["submit", "update:newParticipant"],
  setup(props, { emit }) {
    const localParticipant = ref({ ...props.newParticipant });

    watch(
      () => props.newParticipant,
      (newVal) => {
        localParticipant.value = { ...newVal };
      }
    );

    const onSubmit = () => {
      emit("update:newParticipant", localParticipant.value);
      emit("submit");
    };

    return {
      localParticipant,
      onSubmit,
    };
  },
});
</script>



<style scoped>
.lottery-app {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.card {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background-color: #f8f9fa;
  padding: 3%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.d-flex {
  display: flex;
  flex-direction: column;
}

.winner-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.winner-tags .badge {
  display: flex;
  color: black;
  height: 35px;
  align-items: center;
  gap: 5px;
  padding: 10px;
  font-size: 1rem;
}

.blue {
  background-color: rgba(13, 110, 253, 0.5);
}

.winner-tags button {
  margin-left: 2px;
  margin-top: 1px;
}

.gray-border {
  border: solid gray 1px;
  border-radius: 10px;
  padding: 10px;
}

form div {
  margin-bottom: 10px;
}

.text-danger {
  color: red;
  font-size: 0.875rem;
}

table {
  width: 100%;
}

thead {
  background-color: #e9ecef;
}

th,
td {
  padding: 8px;
  text-align: center;
}

button {
  margin-top: 10px;
}
</style>
