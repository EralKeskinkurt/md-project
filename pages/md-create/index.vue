<template>
  <div class="flex flex-col items-center w-full h-full justify-end relative" @submit.prevent>
    <div class="flex items-start w-full justify-start h-[7%]">
      <BackIcon @click="useRouter().push('/')" class="w-[100px] cursor-pointer bg-black/10 h-full p-3 border-r-[1px] text-center border-r-white/10 text-[30px] text-white font-bold" />
      <input type="text" placeholder="Enter a blog title" class="w-[350px] flex-grow h-full box-border text-white text-lg px-4 bg-black/10  placeholder-white/50  border-b-[2px] border-b-white/5 font-bold outline-none" v-model="mdTitle">
      <button @click="createClick" type="submit" class="w-[150px] bg-[#25c963] h-full text-black text-xl font-bold">Create</button>
    </div>
    <MdEditor language="en-US" v-model="mdContentText" theme="dark" class="w-full !h-[93%] text-white" />
  </div>
</template>

<script setup>
import MdEditor from "md-editor-v3";
import 'md-editor-v3/lib/style.css';
import {Icon} from "#components";
import useFireStorage from "~/composables/useFireStorage";
import {useRouter} from "#app";
import {toastStore} from "~/store/toastStore";
definePageMeta({
  middleware: ['auth'],
  layout:'form-layout'
})
const BackIcon = h(Icon, { name: 'mdi:backspace'})
const mdContentText = ref("## Default Title");
const mdTitle = ref(null);
const createClick = async () => {
 if (mdTitle.value){
   if (mdContentText.value.length > 15){
     await useFireStorage().createMd({title: mdTitle.value, text: mdContentText.value})
     mdTitle.value = null;
     mdContentText.value = "## Default Title";
   }else {
     toastStore().setToast('Error', "Text length must be at least 15 characters")
   }
 }else{
   toastStore().setToast('Error', "Title not be empty and")
 }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

code{
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 0.8rem !important;
}
.md-container {
  font-size: 0.9rem;
}

.default-theme h1 a{
  font-size: 2rem !important;
  font-weight: bold !important;
}
.default-theme h2 a{
  font-size: 1.8rem !important;
  font-weight: bold !important;
}
.default-theme h3 a{
  font-size: 1.6rem !important;
  font-weight: bold !important;
}
.default-theme h4 a{
  font-size: 1.4rem !important;
  font-weight: bold !important;
}
.default-theme h5 a{
  font-size: 1.3rem !important;
  font-weight: bold !important;
}
.default-theme h6 a{
  font-size: 1.2rem !important;
  font-weight: bold !important;
}

.md-container ol{
  max-width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  list-style: decimal;
  font-size: 0.9rem;
}

.md-toolbar-right > div:last-child{
display: none !important;
}
.md-toolbar-left  .md-menu:last-child  .md-menu-item:nth-child(3),
.md-toolbar-left  .md-menu:last-child  .md-menu-item:nth-child(2) {
  display: none !important;
}
.md-toolbar-left > div:last-child{
  display: none !important;
}
.md-toolbar-wrapper{
  height: 60px !important;
}
.md-icon{
  height: 30px !important;
  width: 30px !important;
}
.md-toolbar-wrapper .md-toolbar-item{
  height: 30px !important;
}
</style>