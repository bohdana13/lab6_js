<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="lottery-app">
      <SearchBar @filter-by-name="filterParticipants" />
      <WinnerList :winners="winners" @remove-winner="removeWinner" />
      <ButtonComponent
        class="btn btn-primary mt-2"
        :disabled="winners.length >= 3 || filteredParticipants.length === 0"
        @click="selectWinner"
      >
        New winner
      </ButtonComponent>
      <RegistrationForm :today="today" @register="registerParticipant" />
      <ParticipantsTable
        :participants="filteredParticipants"
        @remove="removeParticipant"
        @update="updateParticipant"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, watch } from "vue";
  import WinnerList from "../components/WinnerList.vue";
  import RegistrationForm from "../components/RegistrationForm.vue";
  import ParticipantsTable from "../components/ParticipantsTable.vue";
  import ButtonComponent from "../components/ButtonComponent.vue";
  import SearchBar from "../components/SearchBar.vue";
  import { Participant } from '../models/Participant';
  import UsersRepository from '../repository/UsersRepository';
  
  export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Lottery",
    components: {
      WinnerList,
      RegistrationForm,
      ParticipantsTable,
      ButtonComponent,
      SearchBar,
    },
    setup() {
      const today = new Date().toISOString().split("T")[0];
      const participants = ref<Participant[]>([]);
      const filteredParticipants = ref<Participant[]>([]);
      const winners = ref<Participant[]>([]);
  
      const saveParticipantsToLocalStorage = () => {
        localStorage.setItem("participants", JSON.stringify(participants.value));
      };
  
      onMounted(async () => {
        const savedParticipants = localStorage.getItem("participants");
        if (savedParticipants) {
          try {
            participants.value = JSON.parse(savedParticipants) || [];
          } catch (error) {
            console.error("Failed to parse participants from localStorage:", error);
            participants.value = [];
          }
        } else {
          participants.value = await UsersRepository.fetchParticipants();
        }
        filteredParticipants.value = [...participants.value];
      });
  
      watch(participants, saveParticipantsToLocalStorage, { deep: true });
  
      const filterParticipants = (searchTerm: string) => {
        filteredParticipants.value = participants.value.filter(p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      };
  
      const registerParticipant = (participant: Participant) => {
        const existingParticipant = participants.value.find(
          (p) => p.email === participant.email
        );
        if (existingParticipant) {
          alert("A participant with this email already exists.");
          return;
        }
        participants.value.push(participant);
        filteredParticipants.value = [...participants.value];
      };
  
      const selectWinner = () => {
        if (participants.value.length > 0 && winners.value.length < 3) {
          const randomIndex = Math.floor(Math.random() * filteredParticipants.value.length);
          const winner = filteredParticipants.value[randomIndex];
          winners.value.push(winner);
          participants.value.splice(participants.value.indexOf(winner), 1);
          filteredParticipants.value = [...participants.value];
        }
      };
  
      const removeWinner = (index: number) => {
        participants.value.push(winners.value[index]);
        winners.value.splice(index, 1);
        filteredParticipants.value = [...participants.value];
      };
  
      const removeParticipant = (index: number) => {
        participants.value.splice(index, 1);
        filteredParticipants.value = [...participants.value];
      };
  
      const updateParticipant = (updatedParticipant: Participant) => {
        const participantIndex = participants.value.findIndex(p => p.email === updatedParticipant.email);
        if (participantIndex !== -1) {
          participants.value[participantIndex] = updatedParticipant;
          filteredParticipants.value = [...participants.value];
        }
      };
  
      return {
        today,
        participants,
        filteredParticipants,
        winners,
        registerParticipant,
        selectWinner,
        removeWinner,
        removeParticipant,
        filterParticipants,
        updateParticipant
      };
    }
  });
  </script>
  
  <style scoped>
  .lottery-app {
    display: grid;
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  </style>
  