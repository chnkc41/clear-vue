<template>
  <tr>
    <td class="text-left">{{ subCircuit.name }}</td>
    <td class="text-left">{{ subCircuit.installationDate }}</td>
    <td class="text-left">{{ !!subCircuit.isMain }}</td>
  </tr>
</template>

<script>
export default {
  props: ["subCircuit"],
};
</script>
 