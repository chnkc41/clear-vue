<template>
  <div>
    <MainHeader :breadcrumpData="breadcrumpData" />
    <div class="pa-10">
      <MeterList :customerName="customerName" />
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/layout/MainHeader";
import MeterList from "@/components/customers/meters/MeterList";
import { urls } from "@/constants/constants.js";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "MeterDataList",
  components: {
    MeterList,
    MainHeader,
  },

  data() {
    return {
      customerName: "",
      provideDataMeter: {
        meterList: [],
        customerId: "",
        siteId: "",
        siteIndex: "",
      },
      breadcrumpData: {
        title: "Metter List",
        // buttonText: "ADD NEW",
        // buttonPath: "/newCustomer/",
        // icon: "mdi-plus",
        goHome: true,
      },
    };
  },

  provide() {
    return {
      provideDataMeter: this.provideDataMeter,
      deleteItem: this.deleteCustomer,
    };
  },

  created() {
    this.provideDataMeter.customerId = this.$route.params.customerId;
    this.provideDataMeter.siteId = this.$route.params.siteId;
    this.provideDataMeter.siteIndex = this.$route.params.siteIndex;

    this.$axios
      .get(`${urls.URL_CUSTOMERS}/${this.provideDataMeter.customerId}`)
      .then((response) => {
        const currentSite =
          response.data.sites.filter(
            (s) => s.id === this.provideDataMeter.siteId
          ) || [];

        this.provideDataMeter.meterList = currentSite[0]?.meters;
        this.customerName = response.data.name || "";
        this.breadcrumpData.title =
          `${response.data.sites[0].name}'s Metter List & Circuits ` || "";
      });
  },

  methods: {
    deleteCustomer(customer) {
      this.$axios
        .delete(`${urls.URL_CUSTOMERS}/${customer.id}`)
        .then((delete_response) => {
          if (delete_response.status === 200) {
            this.provideDataMeter.meterList =
              this.provideDataMeter.meterList.filter(
                (c) => c.id !== customer.id
              );
            this.notify(`${customer.name} customer deleted.`);
          } else {
            this.notify(
              "A network error has occurred, please try again later!"
            );
          }
        });
    },

    notify(message) {
      toast(message, {
        autoClose: 3000,
      });
    },
  },
};
</script>

