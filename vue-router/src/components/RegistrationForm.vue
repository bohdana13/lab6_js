<template>
  <div class="card">
    <h3>REGISTER FORM</h3>
    <p>Please fill in all the fields.</p>
    <form @submit.prevent="onSubmit" novalidate>
      <InputComponent
        label="Name"
        v-model="name"
        type="text"
        placeholder="Enter user name"
        :error="nameError"
      />
      <InputComponent
        label="Date of Birth"
        v-model="dateOfBirth"
        type="date"
        :max="today"
        :error="dateOfBirthError"
      />
      <InputComponent
        label="Email"
        v-model="email"
        type="email"
        placeholder="Enter email"
        :error="emailError"
      />
      <InputComponent
        label="Phone number"
        v-model="phoneNumber"
        type="tel"
        placeholder="Enter phone number"
        :error="phoneNumberError"
      />
      <ButtonComponent type="submit">Save</ButtonComponent>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputComponent from "./InputComponent.vue";
import ButtonComponent from "./ButtonComponent.vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

export default defineComponent({
  name: "RegistrationForm",
  components: { InputComponent, ButtonComponent },
  props: {
    today: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const schema = yup.object({
      name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
      dateOfBirth: yup
        .date()
        .required("Date of Birth is required")
        .max(new Date(props.today), "Date cannot be in the future"),
      email: yup.string().required("Email is required").email("Enter a valid email"),
      phoneNumber: yup
        .string()
        .required("Phone number is required")
        .matches(/^[0-9]+$/, "Phone number must contain only digits"),
    });

    const { handleSubmit, resetForm } = useForm({
      validationSchema: schema,
      initialValues: {
        name: "",
        dateOfBirth: "",
        email: "",
        phoneNumber: ""
      },
    });

    const { value: name, errorMessage: nameError } = useField<string>("name");
    const { value: dateOfBirth, errorMessage: dateOfBirthError } = useField<string>("dateOfBirth");
    const { value: email, errorMessage: emailError } = useField<string>("email");
    const { value: phoneNumber, errorMessage: phoneNumberError } = useField<string>("phoneNumber");

    const onSubmit = handleSubmit((values) => {
      emit("register", values);
      resetForm();
    });

    return {
      name,
      dateOfBirth,
      email,
      phoneNumber,
      nameError,
      dateOfBirthError,
      emailError,
      phoneNumberError,
      onSubmit,
    };
  },
});
</script>
