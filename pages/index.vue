<template>
<div class="flex items-center w-full h-[91%] justify-center relative">
  <MdForm />
  <MdPreview />
</div>
</template>

<script setup>
import MdForm from "~/components/MdForm.vue";
import MdPreview from "~/components/MdPreview.vue";
definePageMeta({
  middleware: ['auth']
})
</script>