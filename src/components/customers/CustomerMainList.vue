<template>
  <div>
    <MainHeader :breadcrumpData="breadcrumpData" />
    <div class="pa-10">
      <CustomerList />
      <ResultBar />
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/layout/MainHeader";
import CustomerList from "@/components/customers/CustomerList";
import ResultBar from "@/components/customers/ResultBar";
import { urls } from "@/constants/constants.js";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "CustomerMainList",
  components: {
    CustomerList,
    ResultBar,
    MainHeader,
  },

  data() {
    return {
      provideData: {
        customerList: [],
      },
      breadcrumpData: {
        title: "Customer List",
        buttonText: "ADD NEW",
        buttonPath: "/newCustomer/",
        icon: "mdi-plus",
      },
    };
  },

  provide() {
    return {
      provideData: this.provideData,
      deleteItem: this.deleteCustomer,
    };
  },

  created() {
    this.$axios.get(urls.URL_CUSTOMERS).then((response) => {
      this.provideData.customerList = response.data || [];
    });
  },

  methods: {
    deleteCustomer(customer) {
      this.$axios
        .delete(`${urls.URL_CUSTOMERS}/${customer.id}`)
        .then((delete_response) => {
          if (delete_response.status === 200) {
            this.provideData.customerList =
              this.provideData.customerList.filter((c) => c.id !== customer.id);
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

