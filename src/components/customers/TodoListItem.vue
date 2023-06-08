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

    <!-- <td>{{ item.id }}</td> -->
    <td>{{ item.name }}</td>
    <td>{{ item.email }}</td>
    <td>{{ item.vatNumber }}</td>

    <td>
      <div class="text-center">
        <router-link
          :to="`/newCustomer/${item.id}`"
          class="text-decoration-none"
          active-class="active"
          exact
        >
          <!-- color="primary" -->
          <v-icon
            color="green-darken-2"
            icon="mdi-pencil-outline"
            class="mx-1"
          ></v-icon>
        </router-link>

        <v-icon
          color="red-darken-2"
          icon="mdi-trash-can-outline"
          class="mx-1"
          @click="deleteItem(item)"
        ></v-icon>
      </div>
    </td>
  </tr>

  <!--Sites Content -->

  <tr v-show="show">
    <td colspan="6">
      <v-expand-transition>
        <div v-show="show">
          <!-- <v-divider></v-divider> --> 
          <div class="d-flex flex-wrap justify-center my-5">
            <ShowSites
              v-for="(site, index) in item.sites"
              :key="site.id"
              :site="site"
              :customerId="item.id"
              :siteId="site.id"
              :siteIndex="index" 
            />
          </div>
        </div>
      </v-expand-transition>
    </td>
  </tr>
</template>

<script>
import ShowSites from "@/components/customers/sites/ShowSites";
export default {
  props: ["item"],
  inject: ["provideData", "deleteItem"],

  components: {
    ShowSites,
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
