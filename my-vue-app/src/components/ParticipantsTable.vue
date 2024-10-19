<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Date of Birth</th>
          <th>Email</th>
          <th>Phone number</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(participant, index) in participants" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ participant.name }}</td>
          <td>{{ participant.dateOfBirth }}</td>
          <td>{{ participant.email }}</td>
          <td>{{ participant.phoneNumber }}</td>
          <td>
            <ButtonComponent @click="remove(index)" class="delete-btn">Delete</ButtonComponent>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Participant } from '../models/Participant';
import ButtonComponent from './ButtonComponent.vue';

export default defineComponent({
  name: "ParticipantsTable",
  components: { ButtonComponent },
  props: {
    participants: {
      type: Array as PropType<Participant[]>,
      required: true
    }
  },
  emits: ["remove"],
  methods: {
    remove(index: number) {
      this.$emit("remove", index);
    }
  }
});
</script>
