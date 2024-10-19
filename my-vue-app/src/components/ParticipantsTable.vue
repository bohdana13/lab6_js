<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>
            Name
            <button @click="sortByNameAsc">
              <i class="bi bi-sort-alpha-down"></i>
            </button>
            <button @click="sortByNameDesc">
              <i class="bi bi-sort-alpha-down-alt"></i>
            </button>
          </th>
          <th>
            Date of Birth
            <button @click="sortByDateAsc">
              <i class="bi bi-sort-down"></i>
            </button>
            <button @click="sortByDateDesc">
              <i class="bi bi-sort-down-alt"></i>
            </button>
          </th>
          <th>Email</th>
          <th>Phone number</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(participant, index) in sortedParticipants" :key="index">
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
import { defineComponent, PropType, computed } from "vue";
import { Participant } from '../models/Participant';
import ButtonComponent from './ButtonComponent.vue';

export default defineComponent({
  name: "ParticipantsTable",
  components: { ButtonComponent },
  props: {
    participants: {
      type: Array as PropType<Participant[]>,
      required: true,
    },
  },
  emits: ["remove"],
  data() {
    return {
      sortKey: "name", 
      sortAsc: true, 
    };
  },
  computed: {
    sortedParticipants() {
      return [...this.participants].sort((a, b) => {
        if (this.sortKey === "name") {
          const comparison = a.name.localeCompare(b.name);
          return this.sortAsc ? comparison : -comparison;
        } else if (this.sortKey === "dateOfBirth") {
          const dateA = new Date(a.dateOfBirth);
          const dateB = new Date(b.dateOfBirth);
          return this.sortAsc ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        }
        return 0;
      });
    },
  },
  methods: {
    sortByNameAsc() {
      this.sortKey = "name";
      this.sortAsc = true;
    },
    sortByNameDesc() {
      this.sortKey = "name";
      this.sortAsc = false;
    },
    sortByDateAsc() {
      this.sortKey = "dateOfBirth";
      this.sortAsc = true;
    },
    sortByDateDesc() {
      this.sortKey = "dateOfBirth";
      this.sortAsc = false;
    },
    remove(index: number) {
      this.$emit("remove", index);
    },
  },
});
</script>
