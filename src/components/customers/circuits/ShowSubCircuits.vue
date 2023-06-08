<template>
  <tr>
    <td class="text-left">{{ subCircuit.name }}</td>
    <td class="text-left">{{ subCircuit.installationDate }}</td>
    <td class="text-left">{{ !!subCircuit.isMain }}</td>
    <td class="text-center">
      <div class="text-center">
        <v-icon
          color="green-darken-2"
          icon="mdi-pencil-outline"
          class="mx-1"
          @click="$emit('delete-todo-item', item)"
        ></v-icon>

        <v-icon
          color="red-darken-2"
          icon="mdi-trash-can-outline"
          class="mx-1"
          @click="deleteItem(item)"
        ></v-icon>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["subCircuit"],
};
</script>
 