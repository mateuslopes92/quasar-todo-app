<template>
  <q-page padding>
    <q-table
      title="Todo items"
      :rows="items"
      :columns="columns"
      row-key="id"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const items = ref([]);
    const columns = [
      {
        name: 'id', align: 'center', label: 'id', sortable: true,
      },
      {
        name: 'title', align: 'center', label: 'title', sortable: true,
      },
      {
        name: 'content', align: 'center', label: 'content', sortable: true,
      },
      {
        name: 'done', align: 'center', label: 'done', sortable: true,
      },
    ];

    const getItems = async () => {
      try {
        const { data } = await api.get('/items');
        items.value = data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getItems();
    });

    return {
      items,
      columns,
    };
  },
});
</script>
