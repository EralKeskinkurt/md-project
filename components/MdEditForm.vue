<template>
  <form class="w-[500px] flex flex-col items-center justify-center h-full bg-transparent" @submit.prevent="updateHandle">
    <input type="text" class="w-full h-[10%] box-border text-black text-xl px-4  font-bold outline-none border-b-black/20 border-t-black/20  border-[2px]" v-model="mdTitle">
    <textarea v-model="mdContentText" class="w-full px-4 py-3 h-[90%] resize-none  outline-none border-b-black/20 border-t-black/20 border-[2px]" ></textarea>
    <button type="submit" class="w-full bg-green-600 h-[50px] text-xl font-bold">Update</button>
  </form>
</template>

<script setup>
import {userBlogStore} from "~/store/userBlogStore";
import useFireStorage from "~/composables/useFireStorage";
import {useRoute} from "#app";
const mdContentText = ref(null);
const mdTitle = ref(null);
const id = useRoute().params.id;
onMounted(async () => {
  await useFireStorage().getMdFiles();
  const posts = await userBlogStore().getBlogs.data;
  const postUrl = await posts.find((p) => p?.mdTitle === id);
  mdContentText.value = postUrl?.mdText
  mdTitle.value = postUrl?.mdTitle
})
const updateHandle = async () => {
  const posts = await userBlogStore().getBlogs.data;
  const postUrl = await posts.find((p) => p?.mdTitle === paramId);
  await useFireStorage().updateMdFile({
    oldMd: {
      mdText: postUrl.mdText,
      mdTitle: postUrl.mdTitle,
      mdFileUrl: postUrl.mdFileUrl
    },
    newMd: {
      mdTitle: mdTitle.value,
      mdText: mdContentText.value
    }
  })
}
</script>

