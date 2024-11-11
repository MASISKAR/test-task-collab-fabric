import {reactive, ref, watch, computed} from 'vue';
import {defineStore} from 'pinia';

export const useFormStore = defineStore('form', () => {
  const _forms = reactive([]);
  const isLoading = ref(false);
  const notification = reactive({type: '', message: ''});
  const _editingForm = ref({});
  const notificationTimeout = ref(null);
  
  watch(notification, (value) => {
    if(value.type){
        clearTimeout(notificationTimeout.value);
        notificationTimeout.value = setTimeout(() => {
            resetNotification();
          notificationTimeout.value = null;
        }, 3000);
    }
  });
  
  const editingForm = computed(() => Object.keys(_editingForm.value).length ? _editingForm.value : null);
  const forms = computed(() => _forms.map(f => ({...f, dateOfBirth: f.dateOfBirth.slice(0, 10)})));
  
  function setEditingForm(form) {
    if(!form){
      _editingForm.value = {};
    }
    else {
      _editingForm.value = form;
    }
  }
  
  function resetNotification() {
    notification.type = '';
    notification.message = '';
  }
  
  function addForm(form) {
    _forms.push(form);
  }
  
  function removeForm(formId) {
    const foundFormIndex = _forms.findIndex(f => f._id === formId);
    if (foundFormIndex !== -1) {
      _forms.splice(foundFormIndex, 1);
    }
  }
  
  function updateForm(form) {
    const foundFormIndex = _forms.findIndex(f => f._id === form._id);
    if (foundFormIndex !== -1) {
      _forms[foundFormIndex] = form;
    }
  }
  
  function setForms(newForms) {
    _forms.splice(0, _forms.length, ...newForms);
  }
  
  function setIsLoading(value) {
    if(value){
      resetNotification();
    }
    isLoading.value = value;
  }
  
  const setNotification = {
    error(message) {
      notification.type = 'error';
      notification.message = message;
    },
    success(message) {
      notification.type = 'success';
      notification.message = message;
    },
  }

  return {
    forms,
    addForm,
    removeForm,
    updateForm,
    setForms,
    setIsLoading,
    setNotification,
    isLoading,
    notification,
    editingForm,
    setEditingForm
  };
})
