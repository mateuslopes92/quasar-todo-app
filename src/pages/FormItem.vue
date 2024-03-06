<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="row"
    >
      <q-input
        outlined
        v-model="form.title"
        label="Title"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Please type the title']"
      />
    </q-form>
    <div>
      <q-editor
        v-model="form.content"
        min-height="5rem"
        :rules="[ val => val && val.length > 0 || 'Please type the title']"
      />
    </div>
    <div class="col-12 q-gutter-sm q-pt-sm">
      <q-btn
        label="Save"
        color="primary"
        class="float-right"
        icon="save"
        type="submit"
      />
      <q-btn
        label="Cancel"
        color="white"
        class="float-right"
        text-color="primary"
        :to="{ name: 'home' }"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import itemsService from 'src/services/itemsService';

export default defineComponent({
  name: 'FormItem',
  setup() {
    const form = ref({
      title: '',
      content: '',
      done: false,
    });
    const { post } = itemsService();

    const onSubmit = async () => {
      try {
        await post(form.value);
      } catch (error) {
        console.error(error);
      }
    };

    return {
      form,
      onSubmit,
    };
  },
});
</script>
