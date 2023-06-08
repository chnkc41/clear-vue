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

    <td>{{ item.id }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.serialNumber }}</td>
    <td>{{ item.installationDate }}</td>
  </tr>

  <!--Circuits Content -->
  <tr v-show="show">
    <td colspan="6">
      <v-expand-transition>
        <div v-show="show"> 

          <div>
            <router-link
              :to="`/newCircuit/${provideDataMeter.customerId}/${provideDataMeter.siteId}/${item.id}/${provideDataMeter.siteIndex}/${meterIndex}`"
              class="text-decoration-none"
              active-class="active"
              exact
            >
              <v-btn class="mt-5 ml-5">
                ADD NEW CIRCUIT
                <v-icon end icon="mdi-plus"></v-icon>
              </v-btn>
            </router-link>
          </div>

          <div class="d-flex flex-wrap justify-center my-5">
            <ShowCircuits
              v-for="(circuit, circutIndex) in item.circuits"
              :key="circuit.id"
              :circuit="circuit"
              :to="`/newCircuit/${provideDataMeter.customerId}/${provideDataMeter.siteId}/${item.id}/${provideDataMeter.siteIndex}/${meterIndex}/${circutIndex}`"
            />
          </div>
        </div>
      </v-expand-transition>
    </td>
  </tr>
</template>

<script>
import ShowCircuits from "@/components/customers/circuits/ShowCircuits";
export default {
  name: "MeterListItem",
  props: ["item", "meterIndex"],
  inject: ["provideDataMeter"],

  components: {
    ShowCircuits,
  },

  data() {
    return {
      show: false,
      provideCustomerData: {
        customer: [],
      },
    };
  },

  provide() {
    return {
      provideCustomerData: this.item,
    };
  },
};
</script>
