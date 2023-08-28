<template>
<div class="absolute px-5 rounded-sm transition-all py-2 w-auto z-10 h-auto" :style="isTitle" :class="toastStore().getToast.title === 'Error' ? 'bg-[#1A1A1A] border-[2px] border-red-500/90 text-white top-[20px]' : 'bg-[#1A1A1A] border-[2px] border-green-500/90 text-white top-[20px]'"  >
  <h3 :style="toastStore().getToast.title === 'Error' ? 'color:red;' : 'color: green;'" class="text-[18px] font-bold">{{toastStore().getToast.title}}</h3>
  <p class="text-[14px]">{{toastStore().getToast.message}}</p>
</div>
</template>

<script setup>
import {toastStore} from "~/store/toastStore";

const isTitle = computed(() => {
  if (toastStore().getToast.title){
    return "top:45px;"
  }else{
    return "top:-200px;"
  }
})
</script>