<script setup>
import {useFormStore} from "@/stores/forms";
import FormEdit from "@/components/FormEdit.vue";
import FormList from "@/components/FormList.vue";
import Notification from "@/components/Notification.vue";
import Spinner from "@/components/Spinner.vue";

const {notification, isLoading} = useFormStore();

</script>

<template>
  <header>
    <div class="wrapper">
      <FormEdit/>
      <FormList/>
      <Notification :type="notification.type" :message="notification.message"/>
      <Spinner v-if="isLoading"/>
    </div>
  </header>
</template>


