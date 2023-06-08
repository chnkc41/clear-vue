<template> 
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Details</th> 
        <th class="text-left">Name</th>
        <th class="text-left">Email</th>
        <th class="text-left">Vat Number</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody> 
      <CustomerListItem
        v-for="todoItem in provideData.customerList"
        :key="todoItem.id"
        :item="todoItem" 
      />
    </tbody>
  </v-table> 
</template>

<script>
import CustomerListItem from "@/components/customers/CustomerListItem";

export default { 
  name: "CustomerList",
  inject: ["provideData"],

  components: { 
    CustomerListItem,
  },
 
};
</script>


 
 