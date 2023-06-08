<template>
  <MainHeader :breadcrumpData="breadcrumpData" />

  <v-card max-width="900px" class="mx-auto mb-15">
    <v-form v-model="valid" fast-fail @submit.prevent>
      <v-card-title> Customer Informations </v-card-title>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              clearable
              v-model="customerData.name"
              :rules="textRules"
              :counter="100"
              label="Name"
              required
              variant="underlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              clearable
              v-model="customerData.email"
              :rules="emailRules"
              label="E-mail"
              required
              variant="underlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              clearable
              v-model="customerData.vatNumber"
              :rules="textRules"
              :counter="100"
              label="Vat Number"
              required
              variant="underlined"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <div class="d-flex justify-space-between">
        <v-card-title> Customer - Sites </v-card-title>
        <v-btn class="ma-2" color="primary" @click="addNewSite">
          Add Site <v-icon end icon="mdi-plus"></v-icon>
        </v-btn>
      </div>

      <div v-for="(site, siteIndex) in customerData.sites" :key="siteIndex">
        <v-card-subtitle> Site {{ siteIndex + 1 }} </v-card-subtitle>
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                clearable
                v-model="site.name"
                :rules="textRules"
                :counter="100"
                label="Site Name"
                required
                variant="underlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                clearable
                v-model="site.address"
                :rules="textRules"
                label="Address"
                required
                variant="underlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                clearable
                v-model="site.postCode"
                :rules="textRules"
                :counter="100"
                label="Post Code"
                required
                variant="underlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                type="number"
                step=".01"
                clearable
                v-model="site.coordinates.latitude" 
                label="Latitude"
                required
                variant="underlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                type="number"
                step=".01"
                clearable
                v-model="site.coordinates.longitude" 
                label="Longitude"
                required
                variant="underlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <div class="pa-5">
          <v-card title="Site - Meters" class="meters px-5 pb-2">
            <v-row v-for="(meter, meterIndex) in site.meters" :key="meterIndex">
              <v-col cols="12" md="4">
                <v-text-field
                  clearable
                  v-model="meter.name"
                  :rules="textRules"
                  :counter="100"
                  label="Meter Name"
                  required
                  variant="underlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  clearable
                  v-model="meter.serialNumber"
                  :rules="textRules"
                  :counter="100"
                  label="Serial Number"
                  required
                  variant="underlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field
                  type="date"
                  clearable
                  v-model="meter.installationDate"
                  :rules="textRules"
                  :counter="100"
                  label="Installation Date"
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
                  @click="deleteMeter(siteIndex, meterIndex)"
                ></v-icon>
              </v-col>
            </v-row>

            <v-row class="mb-2">
              <v-col cols="12" class="text-right">
                <v-btn class="ma-2" @click="addNewMeter(siteIndex)">
                  Add Meter <v-icon end icon="mdi-plus"></v-icon>
                </v-btn>
              </v-col>
            </v-row>
 
          </v-card>
        </div>

        <v-divider class="my-5"></v-divider>
      </div>

      <v-card-actions class="justify-center">
        <v-btn class="ma-2" @click="$router.push({ name: 'HomePage' })">
          Cancel
        </v-btn>

        <v-btn
          type="submit"
          class="ma-2"
          color="primary"
          @click="onSave"
          v-if="!customerId"
        >
          Save <v-icon end icon="mdi-plus"></v-icon>
        </v-btn>

        <v-btn
          type="submit"
          class="ma-2"
          color="primary"
          @click="onUpdate"
          v-if="customerId"
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
  components: {
    MainHeader,
  },

  data: () => ({
    valid: false,
    breadcrumpData: {
      title: "Add New Customer",
      goBack: true,
    },
    customerId: null,

    customerData: {
      id: uuid.v1(),
      name: "",
      email: "",
      vatNumber: "",
      sites: [
        {
          id: uuid.v1(),
          name: "",
          address: "",
          postCode: "",
          coordinates: {
            latitude: "",
            longitude: "",
          },
          meters: [
            {
              id: uuid.v1(),
              name: "",
              serialNumber: "",
              installationDate: "",
              circuits: [],
            },
          ],
        },
      ],
    },

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
  }),

  created() {
    this.customerId = this.$route.params.customerId;

    if (this.$route.params.customerId) {
      this.$axios
        .get(`${urls.URL_CUSTOMERS}/${this.customerId}`)
        .then((response) => {
          this.customerData = response.data;
        });
    }
  },

  methods: {
    onSave() {
      if (this.valid) {
        this.$axios.post(urls.URL_CUSTOMERS, this.customerData).then(() => {
          this.notify("New Customer Added!");
          this.resetData();
          this.$router.push("/");
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
            this.notify("Customer Updated!");
            this.resetData();
            this.$router.push("/");
          });
      } else {
        this.notify("Please fill required areas!");
      }
    },

    resetData() {
      Object.keys(this.customerData).forEach(
        (key) => (this.customerData[key] = null)
      );
    },

    notify(message) {
      toast(message, {
        autoClose: 3000,
      });
    },

    addNewSite() { 
      const siteInitialObject = {
        id: uuid.v1(),
        name: "",
        address: "",
        postCode: "",
        coordinates: {
          latitude: "",
          longitude: "",
        },
        meters: [
          {
            id: uuid.v1(),
            name: "",
            serialNumber: "",
            installationDate: "",
            circuits: [],
          },
        ],
      };

      this.customerData.sites.push(siteInitialObject);
    },

    addNewMeter(siteIndex) {
      // const new_obj = { ...meterInitialObject, id: uuid.v1() };
      const meterInitialObject = {
        id: uuid.v1(),
        name: "",
        serialNumber: "",
        installationDate: "",
        circuits: [],
      };

      this.customerData.sites[siteIndex].meters.push(meterInitialObject);
    },

    deleteMeter(siteIndex, meterIndex) {
      this.customerData.sites[siteIndex].meters.splice(meterIndex, 1);
    },
  },
};
</script>


<style>
.meters {
  background-color: #f9f9f9;
}
</style>