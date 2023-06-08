<template>
  <v-card class="card">
    <div>
      <div class="d-flex justify-space-between align-content-start mb-3">
        <v-card-title> Circuit Name: {{ circuit.name }} </v-card-title>
        <div class="mt-3 pr-3">
          <div>
            <router-link
              :to="to"
              class="text-decoration-none"
              active-class="active"
              exact
            >
             <v-icon
            size="large"
            color="green-darken-2"
            icon="mdi-pencil-outline"
            class="mx-1" 
          ></v-icon>
            </router-link>
          </div>

          

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
            <th>installation Date</th>
            <th>:</th>
            <td>{{ circuit.installationDate }}</td>
          </tr>

          <tr>
            <th>isMain</th>
            <th>:</th>
            <td>{{ !!circuit.isMain }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>

    <v-card-actions>
      <v-btn color="orange-lighten-2" variant="text"> Show Subcircuit </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-table class="pb-5">
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Installation Date</th>
              <th class="text-left">Is Main</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody> 
            <ShowSubCircuits
              v-for="subCircuit in circuit.subCircuits"
              :key="subCircuit.id"
              :subCircuit="subCircuit"
              @delete-todo-item="$emit('delete-todo-item', $event)"
            />
          </tbody>
        </v-table>
      </div>
    </v-expand-transition>

    <!--  <v-divider></v-divider>-->
  </v-card>
</template>

<script>
import ShowSubCircuits from "@/components/customers/circuits/ShowSubCircuits";

export default {
  props: ["circuit", "to"],
  inject: ["provideCustomerData"],
  components: {
    ShowSubCircuits,
  },

  data: () => ({
    show: false,
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