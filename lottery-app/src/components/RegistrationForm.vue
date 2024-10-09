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
import InputField from "./InputComponent.vue";
import ButtonComponent from "./ButtonComponent.vue";
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

    // Watch for changes in newParticipant prop and update local copy
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
