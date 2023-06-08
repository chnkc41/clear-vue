<template>  
   <p class="mt-5"> Total item: {{provideData.customerList.length}} </p>
</template>

<script>
export default {
    inject: ["provideData"]
}
</script>