<template>
  <div class="flex h-[85%] items-center w-full justify-start relative">
    <ProfileCard />
    <UserBlogList />
  </div>
</template>

<script setup>
import ProfileCard from "~/components/ProfileCard.vue";
import UserBlogList from "~/components/UserBlogList.vue";
import useFireStorage from "~/composables/useFireStorage";
onMounted(async () => {
  await useFireStorage().getMdFiles();
});
</script>