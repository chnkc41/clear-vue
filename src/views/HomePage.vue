<template>
  <div>
    <CustomerMainList />
  </div>
</template>

<script>
import CustomerMainList from "@/components/customers/CustomerMainList";

export default {
  name: "HomePage",
  components: {
    CustomerMainList,
  },
};
</script>