<template> 
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Details</th>
        <!-- <th class="text-left">customerName</th> -->
        <th class="text-left">Id</th>
        <th class="text-left">Name</th>
        <th class="text-left">Serial Number</th>
        <th class="text-left">installation Date</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <MeterListItem
        v-for="(item,index) in provideDataMeter.meterList"
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
  props: ["customerName"],
  inject: ["provideDataMeter"],
  // props: {
  //     myData: {
  //         type: String,
  //         required: false,
  //         default: ""
  //     }
  // },

  components: {
    MeterListItem,
  },
};
</script>


 
 