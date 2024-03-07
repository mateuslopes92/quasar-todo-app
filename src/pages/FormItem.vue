<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
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

      <div class="col-lg-6 col-xs-12">
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
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import itemsService from 'src/services/itemsService';

export default defineComponent({
  name: 'FormItem',
  setup() {
    const form = ref({
      title: '',
      content: '',
      done: false,
    });
    const { post, getById, update } = itemsService();
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const { id } = route.params;

    const getItem = async () => {
      try {
        const data = await getById(id);
        form.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(async () => {
      if (id) {
        getItem();
      }
    });

    const onSubmit = async () => {
      try {
        if (id) {
          await update(form.value);
        } else {
          await post(form.value);
        }
        $q.notify({
          message: 'Item added',
          icon: 'check',
          color: 'positive',
        });
        router.push({ name: 'home' });
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
