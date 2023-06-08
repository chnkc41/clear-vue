<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Details</th> 
        <th class="text-left">Id</th>
        <th class="text-left">Name</th>
        <th class="text-left">Serial Number</th>
        <th class="text-left">Installation Date</th>
      </tr>
    </thead>
    <tbody>
      <MeterListItem
        v-for="(item, index) in provideDataMeter.meterList"
        :key="item.id"
        :item="item"
        :meterIndex="index"
      />
    </tbody>
  </v-table>
</template>

<script>
import MeterListItem from "@/components/customers/meters/MeterListItem";

export default {
  name: "MeterList",
  props: ["customerName"],
  inject: ["provideDataMeter"],

  components: {
    MeterListItem,
  },
};
</script>


 
 