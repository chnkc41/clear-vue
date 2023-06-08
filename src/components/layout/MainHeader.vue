<template>
  <header class="d-flex justify-sm-space-between px-8">
    <div class="logo">
      <router-link
        to="/"
        class="text-decoration-none"
        active-class="active"
        exact 
      >
        <v-img :src="require('@/assets/logo.svg')" class="my-3" contain />
      </router-link>
    </div>

    <h6 class="text-h6">{{ breadcrumpData?.title }}</h6>

    <div>
      <router-link
        to="/"
        class="text-decoration-none"
        active-class="active"
        exact
        v-show="breadcrumpData?.goHome"
      >
        <v-btn class="ma-2"> Customers </v-btn>
      </router-link>

      <router-link
        v-if="breadcrumpData?.buttonText"
        :to="breadcrumpData?.buttonPath || '/'"
        class="text-decoration-none"
        active-class="active"
        exact
      >
        <!-- color="primary" -->
        <v-btn class="ma-2">
          {{ breadcrumpData?.buttonText }}
          <v-icon
            end
            :icon="breadcrumpData?.icon"
            v-if="breadcrumpData?.icon"
          ></v-icon>
        </v-btn>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  props: ["breadcrumpData"],
  // methods: {
  //   goBack() {
  //     this.$router.push({
  //       name: "CircuitsPage",
  //       params: {
  //         customerId: "customer1-1",
  //       },
  //     });
  //   },
  // },
};
</script>
 
 <style>
header {
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.logo {
  width: 200px;
  height: auto;
  transition: min-width 0.2s ease-in-out;
}

.active {
  color: blue;
}
</style>