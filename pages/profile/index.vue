<template>
  <div class="flex h-[91%] items-center w-full justify-start relative">
    <ProfileCard />
    <BlogList />
  </div>
</template>

<script setup>
import ProfileCard from "~/components/ProfileCard.vue";
import BlogList from "~/components/BlogList.vue";
definePageMeta({
  middleware: ['auth']
})
</script>
