<script setup>
import {onMounted} from "vue";
import FormView from "./FormView.vue";
import FormEdit from "./FormEdit.vue";
import {useFormStore} from "@/stores/forms";
import FormApi from "@/utils/formApi";

const formApi = new FormApi();
const store = useFormStore();

onMounted(async () => {
  try{
    store.setIsLoading(true);
    const forms = await formApi.getList();
    store.setForms(forms);
  }
  catch (e){
    store.setNotification.error(`Failed to load forms: ${e}`);
  }
    store.setIsLoading(false);
});

const handleDeleteForm = async (id) => {
  try{
    store.setIsLoading(true);
    await formApi.delete(id);
    store.removeForm(id);
    store.setNotification.success("Form deleted successfully");
  }
  catch (e){
    store.setNotification.error(`Failed to delete form: ${e}`);
  }
  store.setIsLoading(false);
};

function handleEditForm(form) {
  store.setEditingForm(form);
}

</script>

<template>
  <div class="max-w-md mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Customer Forms</h2>
    <div v-if="!store.forms.length">The list is empty, create a new form.</div>
  <template v-for="form in store.forms" :key="form._id">
    <FormView
        v-if="store.editingForm?._id !== form._id"
        :data="form"
        @deleteForm="handleDeleteForm"
        @editForm="handleEditForm"
    />
    <FormEdit v-else-if="store.editingForm" :data="form" />
  </template>
  </div>
</template>


