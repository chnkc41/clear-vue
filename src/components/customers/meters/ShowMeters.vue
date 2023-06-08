<template>
  <tr>
    <th class="text-left">
      <v-card-actions>
        <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
        ></v-btn>
      </v-card-actions>
    </th> 
    <td>{{ meter.name }}</td>
    <td>{{ meter.installationDate }}</td>
    <td>{{ meter.serialNumber }}</td>
    <td>
      <div class="text-center">
        <v-icon
          size="large"
          color="green-darken-2"
          icon="mdi-pencil-outline"
          class="mx-1"
          @click="$emit('delete-todo-item', meter)"
        ></v-icon>

        <v-icon
          size="large"
          color="red-darken-2"
          icon="mdi-trash-can-outline"
          class="mx-1"
          @click="$emit('delete-todo-item', meter)"
        ></v-icon>
      </div>
    </td>
  </tr>

  <!--Sites Content -->
  <v-expand-transition>
    <div v-show="show">
      <v-divider></v-divider>

      <div class="d-flex flex-wrap mt-3">
        <ShowCircuits
          v-for="item in meter.circuits"
          :key="item.id"
          :item="item"
          @delete-todo-item="$emit('delete-todo-item', $event)"
        />
      </div>
    </div>
  </v-expand-transition>
</template>

<script>
import ShowCircuits from "@/components/customers/ShowCircuits";

export default {
  name: "ShowMeters",
  props: ["meter"],
  components: {
    ShowCircuits,
  },
  data: () => ({
    show: false,
  }),
};
</script>

<style>
td {
  padding-bottom: 20px;
}
</style>