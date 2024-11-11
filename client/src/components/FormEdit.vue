<script setup>
import {ref, reactive, computed, watch, defineProps} from "vue";
import {useFormStore} from "@/stores/forms";
import FormApi from "@/utils/formApi";

const formApi = new FormApi();
const store = useFormStore();
const props = defineProps({
  data: Object,
});

const defaultFields = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  country: "",
  profession: "",
  yearsInProfession: "",
};

const step = ref(1);
const form = reactive(props.data || {...defaultFields});
const errors = reactive({...defaultFields});

watch(form, ()=>{
  resetErrors();
  if(!form.profession){
    form.yearsInProfession = "";
  }
});

const nextStep = () => {
  switch (step.value) {
    case 1: {
      errors.firstName = form.firstName.trim() ? "" : "First Name is required";
      errors.lastName = form.lastName.trim() ? "" : "Last Name is required";
      break;
    }
    case 2:{
      errors.dateOfBirth = form.dateOfBirth ? "" : "Date of Birth is required";
      break;
    }
    case 3:{
      errors.country = form.country.trim() ? "" : "Country is required";
      if(form.profession){
        errors.yearsInProfession = form.yearsInProfession ? "" : "Years in Profession is required";
      }
      break;
      }
    }
    const hasErrors = Object.values(errors).some((error) => error);
  if (hasErrors) return;
  if (step.value < 3){
    step.value++;
  } else {
    handleSubmit();
  }
};

const prevStep = () => {
  if (step.value > 1) step.value--;
};

const handleSubmit = async () => {
  const newForm = {
    ...props.data,
    ...form,

  };
try{
  store.setIsLoading(false);
  if(newForm._id){
    const res = await formApi.update(newForm._id, newForm);
    store.setNotification.success('Form updated successfully');
    store.updateForm(res);
    store.setEditingForm(null);
  }
  else {
    const res = await formApi.create(newForm);
    store.setNotification.success('Form created successfully');
    store.addForm(res);
  }
}
catch (e){
  store.setNotification.error(e);
}
  store.setIsLoading(false);
  step.value = 1;
  resetForm();
};

const resetForm = () => {
  Object.assign(form, defaultFields);
};

const resetErrors = () => {
  Object.assign(errors, defaultFields);
};

const cancelEdit = () => {
  resetErrors();
  step.value = 1;
  store.setEditingForm(null);
};
const displayErrors = computed(() => {
  return Object.values(errors).filter(Boolean);
});
</script>

<template>
  <div class="max-w-md mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">{{ props.data?._id ? "Update the form": "Create a new Form" }}</h2>

    <form @submit.prevent>
      <div v-if="step === 1">
        <label class="block mb-2">
          First Name
          <input
              type="text"
              v-model="form.firstName"
              class="border p-2 w-full"
              :class="{ 'border-red-500': errors.firstName }"
          />
        </label>
        <label class="block mb-2">
          Last Name
          <input
              type="text"
              v-model="form.lastName"
              class="border p-2 w-full"
              :class="{ 'border-red-500': errors.lastName }"
          />
        </label>
      </div>

      <div v-else-if="step === 2">
        <label class="block mb-2">
          Date of Birth
          <input
              type="date"
              v-model="form.dateOfBirth"
              class="border p-2 w-full"
              :class="{ 'border-red-500': errors.dateOfBirth }"
          />
        </label>
      </div>

      <div v-else-if="step === 3">
        <label class="block mb-2">
          Country
          <input
              type="text"
              v-model="form.country"
              :class="{ 'border-red-500': errors.country }"
              class="border p-2 w-full"
          />
        </label>
        <label class="block mb-2">
          Profession
          <input type="text" v-model="form.profession" class="border p-2 w-full" />
        </label>
        <div v-if="form.profession" class="block mb-2">
          <label>
            Years in Current Profession
            <input
                type="number"
                v-model="form.yearsInProfession"
                min="0"
                class="border p-2 w-full"
                :class="{ 'border-red-500': errors.yearsInProfession }"
            />
          </label>
        </div>
      </div>

      <div class="mt-4">
        <button v-if="step !== 1" @click="prevStep" type="button" class="bg-gray-300 p-2 mr-2">
          Back
        </button>
        <button v-if="step <= 3" @click="nextStep" type="button" class="bg-blue-500 text-white p-2">
          {{step === 3 ? "Submit" : "Next"}}
        </button>
        <button v-if="props.data?._id" @click="cancelEdit" type="button" class="bg-gray-300 p-2 ml-2">Cancel</button>
      </div>
      <div v-if="displayErrors.length" class="text-red-500 text-sm mt-2">
        <ul>
          <li
              v-for="(error) in displayErrors"
              :key="error"
              class="border border-red-500 p-1 m-1"
          >
            {{ error }}
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>


