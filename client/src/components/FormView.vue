<script setup>
import {defineEmits, defineProps} from "vue";

const props = defineProps({
  data: Object,
});

const emit = defineEmits(["deleteForm", "editForm"]);
const {data} = props;

</script>

<template>
  <div class="max-w-md mx-auto p-4">
    <div class="mt-6">
        <div class="mb-4">
          <label class="block">First Name</label>
          <input type="text" :value="data.firstName" disabled class="border p-2 w-full" />
        </div>
        <div class="mb-4">
          <label class="block">Last Name</label>
          <input type="text" :value="data.lastName" disabled class="border p-2 w-full" />
        </div>
        <div class="mb-4">
          <label class="block">Date of Birth</label>
          <input type="date" :value="data.dateOfBirth" disabled class="border p-2 w-full" />
        </div>
        <div class="mb-4">
          <label class="block">Country</label>
          <input type="text" :value="data.country" disabled class="border p-2 w-full" />
        </div>
      <template v-if="data.profession">
        <div class="mb-4">
          <label class="block">Profession</label>
          <input type="text" :value="data.profession"  disabled class="border p-2 w-full" />
        </div>
        <div v-if="data.profession" class="mb-4">
          <label class="block">Years in Current Profession</label>
          <input type="number" :value="data.yearsInProfession" min="0"  disabled class="border p-2 w-full" />
        </div>
      </template>
      <button @click="emit('editForm', data)" class="bg-orange-400 text-white p-2 mr-2">Edit form</button>
      <button @click="emit('deleteForm', data._id)" class="bg-red-900 text-white p-2">Delete form</button>
    </div>
  </div>
</template>


