<template>
  <div class="flex items-center w-full h-[91%] justify-center relative">
    <MdEditForm />
    <MdPreview />
  </div>
</template>
<script setup>
import MdPreview from "~/components/MdPreview.vue";
import MdEditForm from "~/components/MdEditForm.vue";

definePageMeta({
  middleware: ['auth']
})
</script>