<template>
  <v-card class="card">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
      cover
    ></v-img>
 
    <div>
      <div class="d-flex justify-space-between align-content-start">
        <v-card-title> Site Name: {{ site.name }} </v-card-title>
        <div class="mt-3 pr-3">
          <v-icon
            size="large"
            color="green-darken-2"
            icon="mdi-pencil-outline"
            class="mx-1"
            @click="$emit('delete-todo-item', item)"
          ></v-icon>

          <v-icon
            size="large"
            color="red-darken-2"
            icon="mdi-trash-can-outline"
            class="mx-1"
            @click="$emit('delete-todo-item', item)"
          ></v-icon>
        </div>
      </div>
 
      <v-table>
        <tbody>
          <tr>
            <th>Coordinates</th>
            <th>:</th>
            <td>
              {{ site.coordinates.latitude }} - {{ site.coordinates.longitude }}
            </td>
          </tr>

          <tr>
            <th>Address</th>
            <th>:</th>
            <td>{{ site.address }}</td>
          </tr>

          <tr>
            <th>Post Code</th>
            <th>:</th>
            <td>{{ site.postCode }}</td>
          </tr>
        </tbody>
      </v-table>

      <!-- <v-card-subtitle>
        <span class="font-weight-bold">Coordinates:</span>
        {{ site.coordinates.latitude }} -
        {{ site.coordinates.longitude }}
      </v-card-subtitle>

      <v-card-subtitle>
        <span class="font-weight-bold">Address:</span> {{ site.address }}
      </v-card-subtitle>

      <v-card-subtitle>
        <span class="font-weight-bold">Post Code:</span> {{ site.postCode }}
      </v-card-subtitle> -->
    </div>

    <router-link
      :to="`/meterList/${customerId}/${siteId}/${siteIndex}`"
      class="text-decoration-none"
      active-class="active"
      exact
    >
    {{customerName}}
      <v-btn color="darkblue-lighten-2" variant="text" class="my-3">
        Show Meters
      </v-btn>
    </router-link> 
  </v-card>
</template>

<script> 

export default {
  props: ["site","customerId", "siteId", "siteIndex"],
  inject: ["provideCustomerData"],
 
  created() {
    this.metersPath = this.provideCustomerData.id
    console.log(this.provideCustomerData)
    console.log(this.provideCustomerData.id)
  },

  data: () => ({
    show: false,
    metersPath: ""
  }),
};
</script>

<style>
.card {
  max-width: 100%;
  width: 27%;
  margin: 20px;
}

th,
td {
  font-size: 14px;
  height: 40px !important;
}

@media (max-width: 991.98px) {
  .card {
    width: 100%;
  }
}
</style>