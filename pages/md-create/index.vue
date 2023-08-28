
<template>
  <div class="flex items-center w-full h-full justify-start relative">
    <MdForm />
    <MdPreview />
  </div>
</template>

<script setup>
import MdForm from "~/components/MdForm.vue";
import MdPreview from "~/components/MdPreview.vue";
definePageMeta({
  middleware: ['auth'],
  layout:'form-layout'
})
</script>