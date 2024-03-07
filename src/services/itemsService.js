import useApi from 'src/composables/useApi';

export default function itemsService() {
  const {
    post, list, remove, update, getById,
  } = useApi('items');

  return {
    post, list, remove, update, getById,
  };
}
