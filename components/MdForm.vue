<template>
  <form class="w-[50%] flex flex-col items-center justify-start h-full bg-transparent z-50" @submit.prevent>
  <div class="w-full flex items-center justify-center h-[10%]">
    <nuxt-link to="/" type="submit" class=" w-[10%] bg-white/10 h-full text-center p-4 text-3xl text-white font-bold"><BackIcon /></nuxt-link>
    <input type="text" placeholder="Enter a blog title" class="w-[90%] h-full box-border text-white text-lg px-4 bg-white/10  placeholder-white/50  border-b-[2px] border-b-white/5 font-bold outline-none" v-model="mdTitle">
  </div>
    <textarea v-model="mdContentText" placeholder="Enter some text" class="w-full px-4 py-3 h-[90%] resize-none placeholder-white/50 text-white  outline-none bg-white/10 border-none" ></textarea>
    <button @click="createClick" type="submit" class="w-full bg-[#25c963] h-[6%] text-black text-xl font-bold">Create</button>
      <button @click="previewClick" class="w-[50%] bg-yellow-400 h-full text-black text-xl font-bold">Preview</button>
  </form>
</template>

<script setup>
import useFireStorage from "~/composables/useFireStorage";
import {Icon} from "#components";
import {previewStore} from "~/store/previewStore";
const mdContentText = ref(null);
const mdTitle = ref(null);
const BackIcon = h(Icon, { name: 'mdi:backspace'})
onMounted(() => {
  previewStore().setPreview(mdContentText.value)
})
const createClick = async () => {
  await useFireStorage().createMd({title: mdTitle.value , text: mdContentText.value})
  mdTitle.value = null
  mdContentText.value = null
}

const previewClick = () => {
  previewStore().setPreview(mdContentText.value)
}
</script>

