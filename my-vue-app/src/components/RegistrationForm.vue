<template>
  <div class="card">
    <h3>REGISTER FORM</h3>
    <p>Please fill in all the fields.</p>
    <form @submit.prevent="register" novalidate>
      <InputComponent
        label="Name"
        v-model="newParticipant.name"
        type="text"
        placeholder="Enter user name"
        :error="errors.name"
      />
      <InputComponent
        label="Date of Birth"
        v-model="newParticipant.dateOfBirth"
        type="date"
        :max="today"
        :error="errors.dateOfBirth"
      />
      <InputComponent
        label="Email"
        v-model="newParticipant.email"
        type="email"
        placeholder="Enter email"
        :error="errors.email"
      />
      <InputComponent
        label="Phone number"
        v-model="newParticipant.phoneNumber"
        type="tel"
        placeholder="Enter phone number"
        :error="errors.phoneNumber"
      />
      <ButtonComponent type="submit">Save</ButtonComponent>
    </form>
  </div>
</template>

<script lang="ts">
import InputComponent from "./InputComponent.vue";
import ButtonComponent from "./ButtonComponent.vue";
import { Participant } from '../models/Participant';

export default {
  name: "RegistrationForm",
  components: { InputComponent, ButtonComponent },
  props: {
    newParticipant: {
      type: Object as () => Participant,
      required: true,
      default: () => ({
        name: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: ''
      })
    },
    today: {
      type: String,
      required: true
    },
    errors: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  emits: ["register"],
  methods: {
    register() {
      this.$emit("register");
    }
  }
};
</script>
