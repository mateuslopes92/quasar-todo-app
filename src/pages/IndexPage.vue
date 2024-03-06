<template>
  <q-page padding>
    <q-table
      title="Todo items"
      :rows="items"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top>
        <span class="text-h5">All Items</span>
        <q-space />
        <q-btn color="primary" label="Add Item" :to="{ name: 'formItem' }" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="delete"
            color="negative"
            dense size="sm"
            @click="handleDeleteItem(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import itemsService from 'src/services/itemsService';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const items = ref([]);
    const { list, remove } = itemsService();
    const $q = useQuasar();

    const columns = [
      {
        name: 'id', field: 'id', align: 'center', label: 'id', sortable: true,
      },
      {
        name: 'title', field: 'title', align: 'center', label: 'title', sortable: true,
      },
      {
        name: 'content', field: 'content', align: 'center', label: 'content', sortable: true,
      },
      {
        name: 'done', field: 'done', align: 'center', label: 'done', sortable: true,
      },
      {
        name: 'actions', field: 'actions', align: 'right', label: 'actions', sortable: true,
      },
    ];

    const getItems = async () => {
      try {
        const data = await list();
        items.value = data;
      } catch (error) {
        console.log(error);
      }
    };

    const handleDeleteItem = async (id) => {
      try {
        $q.dialog({
          title: 'Confirm',
          message: 'Do you want remove this item?',
          cancel: true,
        }).onOk(async () => {
          await remove(id);
          $q.notify({
            message: 'Item removed',
            icon: 'check',
            color: 'positive',
          });
          await getItems();
        });
      } catch (error) {
        $q.notify({
          message: 'Error removing item',
          icon: 'times',
          color: 'negative',
        });
      }
    };

    onMounted(() => {
      getItems();
    });

    return {
      items,
      columns,
      handleDeleteItem,
    };
  },
});
</script>
