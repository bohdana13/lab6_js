<template>
  <div class="lottery-app">
    <!-- Список переможців -->
    <WinnerList 
    :winners="winners" 
    @remove-winner="removeWinner" />

    <!-- Кнопка для вибору нового переможця -->
    <ButtonComponent class="btn btn-primary mt-2"
      :disabled="winners.length >= 3 || participants.length === 0"
      @click="selectWinner"
    >
      New winner
    </ButtonComponent>

    <!-- Форма реєстрації -->
    <RegistrationForm
      :newParticipant="newParticipant"
      :today="today"
      :errors="{ name: nameError, dateOfBirth: dateError, email: emailError, phoneNumber: phoneError }"
      @register="registerParticipant"
    />

    <!-- Таблиця з учасниками -->
    <ParticipantsTable
      :participants="participants"
      @remove="removeParticipant"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import WinnerList from "./components/WinnerList.vue";
import RegistrationForm from "./components/RegistrationForm.vue";
import ParticipantsTable from "./components/ParticipantsTable.vue";
import ButtonComponent from "./components/ButtonComponent.vue";
import { Participant } from './models/Participant'; // Імпорт типу Participant
import { Validator } from './validation/Validator'; // Імпорт валідатора

export default defineComponent({
  name: "LotteryApp",
  components: {
    WinnerList,
    RegistrationForm,
    ParticipantsTable,
    ButtonComponent,
  },
  setup() {
    const today = new Date().toISOString().split("T")[0]; // Поточна дата
    const newParticipant = ref<Participant>({
      name: "",
      dateOfBirth: "",
      email: "",
      phoneNumber: "",
    });

    const participants = ref<Participant[]>([
      {
        name: "Tetiana Mamontova",
        dateOfBirth: "2005-01-29",
        email: "tetiana@example.com",
        phoneNumber: "+380978040547",
      },
      {
        name: "Katherine Petrovna",
        dateOfBirth: "1985-05-23",
        email: "k.petryvna@example.com",
        phoneNumber: "+380669876543",
      },
    ]);

    const winners = ref<Participant[]>([]);

    const nameError = ref("");
    const dateError = ref("");
    const emailError = ref("");
    const phoneError = ref("");

    const registerParticipant = () => {
      nameError.value = Validator.validateName(newParticipant.value.name);
      dateError.value = Validator.validateDateOfBirth(newParticipant.value.dateOfBirth, today);
      emailError.value = Validator.validateEmail(newParticipant.value.email);
      phoneError.value = Validator.validatePhoneNumber(newParticipant.value.phoneNumber);

      if (nameError.value || dateError.value || emailError.value || phoneError.value) {
        return;
      }

      participants.value.push({ ...newParticipant.value });
      newParticipant.value.name = "";
      newParticipant.value.dateOfBirth = "";
      newParticipant.value.email = "";
      newParticipant.value.phoneNumber = "";
    };

    const selectWinner = () => {
      if (participants.value.length > 0 && winners.value.length < 3) {
        const randomIndex = Math.floor(Math.random() * participants.value.length);
        const winner = participants.value[randomIndex];
        winners.value.push(winner);
        participants.value.splice(randomIndex, 1);
      }
    };

    const removeWinner = (index: number) => {
      participants.value.push(winners.value[index]);
      winners.value.splice(index, 1);
    };

    const removeParticipant = (index: number) => {
      participants.value.splice(index, 1);
    };

    return {
      newParticipant,
      participants,
      winners,
      nameError,
      dateError,
      emailError,
      phoneError,
      today,
      registerParticipant,
      selectWinner,
      removeWinner,
      removeParticipant,
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
  color: rgb(14, 13, 13);
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
.delete-btn {
  width: 80px;
  height: 30px;
  margin: 0 auto;
  display: block;
}
</style>