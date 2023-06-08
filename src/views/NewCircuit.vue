<template>
  <MainHeader />

  <v-card max-width="900px" class="mx-auto">
    <v-form v-model="valid" fast-fail @submit.prevent>
      <div class="d-flex justify-space-between">
        <v-card-title> Circuits </v-card-title>
        <v-btn class="ma-2" color="primary" @click="addNewCircuit">
          Add Circuit <v-icon end icon="mdi-plus"></v-icon>
        </v-btn>
      </div>

      <!-- {{ customerData.sites[0].meters[0] }} -->

      <div v-for="(circuit, index) in circuits" :key="index">
        <v-card-subtitle> Circuit {{ index + 1 }} </v-card-subtitle>

        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                clearable
                v-model="circuit.name"
                :rules="textRules"
                :counter="100"
                label="Site Name"
                required
                variant="underlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                type="date"
                clearable
                v-model="circuit.installationDate"
                :rules="textRules"
                label="Installation Date"
                required
                variant="underlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <div class="pa-5">
          <v-card title="Sub Circuits" class="subCircuits px-5 pb-2">
            <v-row
              v-for="(subCircuit, subCircuitIndex) in circuit.subCircuits"
              :key="subCircuitIndex"
            >
              <v-col cols="12" md="6">
                <v-text-field
                  clearable
                  v-model="subCircuit.name"
                  :rules="textRules"
                  :counter="100"
                  label="Sub Circuit Name"
                  required
                  variant="underlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="5">
                <v-text-field
                  type="date"
                  clearable
                  v-model="subCircuit.installationDate"
                  :rules="textRules"
                  :counter="100"
                  label="Sub Installation Date"
                  required
                  variant="underlined"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="1"
                class="d-flex justfyspace-between align-center"
              >
                <v-icon
                  color="red-darken-2"
                  icon="mdi-trash-can-outline"
                  class="mx-3"
                  @click="deleteSubCircuit(index, subCircuitIndex)"
                ></v-icon>
              </v-col>
            </v-row>

            <v-row class="mb-2">
              <v-col cols="12" class="text-right">
                <v-btn class="ma-2" @click="addNewSubCircuit(index)">
                  Add New <v-icon end icon="mdi-plus"></v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </div>

        <v-divider class="my-5"></v-divider>
      </div>

      <v-card-actions class="justify-center">
        <v-btn class="ma-2" @click="$router.push({ name: 'MeterList' })">
          Cancel
        </v-btn>

        <v-btn
          type="submit"
          class="ma-2"
          color="primary"
          @click="onSave"
          v-if="!circuitIndex"
        >
          Save <v-icon end icon="mdi-plus"></v-icon>
        </v-btn>

        <v-btn
          type="submit"
          class="ma-2"
          color="primary"
          @click="onUpdate"
          v-if="circuitIndex"
        >
          Update <v-icon end icon="mdi-plus"></v-icon>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>


<script>
import { uuid } from "vue-uuid";
import MainHeader from "@/components/layout/MainHeader";
import { urls } from "@/constants/constants.js";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  inject: ["provideDataMeter", "deleteItem"],

  components: {
    MainHeader,
  },

  data: () => ({
    valid: false, 
    customerId: "",
    siteId: "",
    meterId: "",
    siteIndex: "",
    meterIndex: "",
    circuitIndex: null,
    customerData: "",
    circuits: [
      {
        id: uuid.v1(),
        name: "",
        installationDate: "",
        isMain: true,
        subCircuits: [
          {
            id: uuid.v1(),
            name: "",
            installationDate: "",
            isMain: false,
          },
        ],
      },
    ],

    textRules: [
      (value) => {
        if (value) return true;
        return "Requred*";
      },
      (value) => {
        if (value?.length <= 100) return true;
        return "Field must be less than 100 characters.";
      },
    ],
    emailRules: [
      (value) => {
        if (value) return true;
        return "Requred*";
      },
      (value) => {
        if (/.+@.+\..+/.test(value)) return true;
        return "E-mail must be valid.";
      },
    ],

    testCircuit: [
      {
        id: "circuit-1-1-1",
        name: "Circuit 1.1.1",
        installationDate: "Mon Jun 05 2023",
        isMain: true,
        subCircuits: [
          {
            id: "subCircuits1",
            name: "Circuit 1.1.1.1",
            installationDate: "Mon Jun 05 2023",
            is_main: false,
          },
          {
            id: "subCircuits2",
            name: "Circuit 1.1.1.2",
            installationDate: "Mon Jun 05 2023",
            is_main: false,
          },
        ],
      },
    ],
  }),

  created() {
    const path = this.$route.params;
    this.customerId = path.customerId;
    this.siteId = path.siteId;
    this.meterId = path.meterId;
    this.siteIndex = path.siteIndex;
    this.meterIndex = path.meterIndex;
    this.circuitIndex = path.circuitIndex;

    this.$axios
      .get(`${urls.URL_CUSTOMERS}/${this.customerId}`)
      .then((response) => {
        this.customerData = response.data;

        if (this.circuitIndex) {
          const newCircuit = [];
          newCircuit.push(
            response.data.sites[this.siteIndex].meters[this.meterIndex]
              .circuits[this.circuitIndex]
          );

          this.circuits = newCircuit;
        }
      });
  },

  methods: {
    onSave() {
      const allCircuits = [
        ...this.customerData.sites[0].meters[0].circuits,
        ...this.circuits,
      ];

      this.customerData.sites[this.siteIndex].meters[this.meterIndex].circuits =
        allCircuits;

      if (this.valid) {
        this.$axios
          .put(`${urls.URL_CUSTOMERS}/${this.customerId}/`, this.customerData)
          .then(() => {
            this.notify("New Circuit Added!");
            this.resetData(); 
          });
      } else {
        this.notify("Please fill required areas!");
      }
    },

    onUpdate() {
      if (this.valid) {
        this.$axios
          .put(`${urls.URL_CUSTOMERS}/${this.customerId}`, this.customerData)
          .then(() => {
            this.notify("Circuits Updated!");
            this.resetData(); 
          });
      } else {
        this.notify("Please fill required areas!");
      }
    },

    resetData() {
      Object.keys(this.circuits).forEach((key) => (this.circuits[key] = ""));
    },

    notify(message) {
      toast(message, {
        autoClose: 3000,
      });
    },

    addNewCircuit() {
      // Thıs object ıs used for data ınıtıatıon.
      // TODO: Move thıs object as a constant under the constant folder.
      const circuitInitialObject = {
        id: uuid.v1(),
        name: "",
        installationDate: "",
        isMain: true,
        subCircuits: [
          {
            id: uuid.v1(),
            name: "",
            installationDate: "",
            isMain: false,
          },
        ],
      };

      this.circuits.push(circuitInitialObject);
    },

    addNewSubCircuit(index) {
      const subCircuitsObj = {
        id: uuid.v1(),
        name: "",
        installationDate: "",
        isMain: false,
      };

      this.circuits[index].subCircuits.push(subCircuitsObj);
    },

    deleteSubCircuit(index, subCircuitIndex) {
      this.circuits[index].subCircuits.splice(subCircuitIndex, 1);
    },
  },
};
</script>
 
 <style>
.subCircuits {
  background-color: #f9f9f9;
}
</style>