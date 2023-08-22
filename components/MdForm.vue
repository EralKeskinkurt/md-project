<template>
  <form class="w-[500px] flex flex-col items-center justify-center h-full bg-transparent" @submit.prevent="createClick">
    <input type="text" placeholder="Enter a blog title" class="w-full h-[10%] box-border text-black text-xl px-4  font-bold outline-none border-b-black/20 border-t-black/20  border-[2px]" v-model="mdTitle">
    <textarea v-model="mdContentText" placeholder="Enter some text" class="w-full px-4 py-3 h-[90%] resize-none  outline-none border-b-black/20 border-t-black/20 border-[2px]" ></textarea>
    <button type="submit" class="w-full bg-green-600 h-[50px] text-xl font-bold">Send</button>
  </form>
</template>

<script setup>
import useFireStorage from "~/composables/useFireStorage";
const mdContentText = ref(null);
const mdTitle = ref(null);

const createClick = async () => {
  await useFireStorage().createMd({title: mdTitle.value , text: mdContentText.value})
  mdTitle.value = null
  mdContentText.value = null
}
</script>

