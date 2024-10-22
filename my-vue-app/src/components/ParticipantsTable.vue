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
            <!-- <button @click="sortBy('name')">
    <i :class="sortKey === 'name' && sortAsc ? 'bi bi-sort-alpha-down' : 'bi bi-sort-alpha-down-alt'"></i>
  </button> -->
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
          <th>Edit</th>
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
            <ButtonComponent @click="confirmRemove(participant)" class="delete-btn">Delete</ButtonComponent>
          </td>
          <td>
      <ButtonComponent @click="openEditModal(participant)" class="edit-btn">Edit</ButtonComponent>
    </td>
        </tr>
      </tbody>
    </table>
    <ConfirmDeleteModal
      v-if="selectedParticipant"
      :isVisible="isModalVisible"
      :participant="selectedParticipant"
      @confirm="removeParticipant"
      @cancel="isModalVisible = false"
    />
    <EditParticipantModal
  v-if="isEditModalVisible && editedParticipant"
  :isVisible="isEditModalVisible"
  :participant="editedParticipant"
  :errors="errors"
  @update="updateParticipant"
  @cancel="isEditModalVisible = false"
/>


  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Participant } from '../models/Participant';
import ButtonComponent from './ButtonComponent.vue';
import ConfirmDeleteModal from './ModalComponent.vue';
import EditParticipantModal from './EditParticipantModal.vue';

export default defineComponent({
  name: "ParticipantsTable",
  components: { ButtonComponent, ConfirmDeleteModal, EditParticipantModal  },
  props: {
    participants: {
      type: Array as PropType<Participant[]>,
      required: true,
    },
  },
  emits: ["remove", "update"],
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
  //   sortBy(key: string) {
  //   if (this.sortKey === key) {
  //     this.sortAsc = !this.sortAsc;
  //   } else {
  //     this.sortKey = key;
  //     this.sortAsc = true;
  //   }
  // },
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
  setup(props, { emit }) { 
    const isModalVisible = ref(false);
    const isEditModalVisible = ref(false);
    const selectedParticipant = ref<Participant | null>(null);
    const editedParticipant = ref<Participant | null>(null);
    const errors = ref({
      name: "",
      dateOfBirth: "",
      email: "",
      phoneNumber: ""
    });

    const confirmRemove = (participant: Participant) => {
      selectedParticipant.value = participant;
      isModalVisible.value = true;
    };

    const removeParticipant = () => {
      if (selectedParticipant.value !== null) {
        const participantIndex = props.participants.findIndex(p => p.email === selectedParticipant.value!.email);
        if (participantIndex !== -1) {
          emit("remove", participantIndex);
        }
        isModalVisible.value = false;
        selectedParticipant.value = null;
      }
    };
    const openEditModal = (participant: Participant) => {
      editedParticipant.value = { ...participant };
      isEditModalVisible.value = true;
    };

    const updateParticipant = (updatedData: Participant) => {
      const participantIndex = props.participants.findIndex(p => p.email === updatedData.email);
      if (participantIndex !== -1) {
        emit("update", updatedData);
      }
      isEditModalVisible.value = false;
    };

    return {
       isModalVisible,
      isEditModalVisible,
      selectedParticipant,
      editedParticipant,
      confirmRemove,
      updateParticipant,
      removeParticipant,
      openEditModal,
      errors,
    };
  }
});
</script>
