<template>
<div class="absolute px-5 rounded-md transition-all py-2 w-auto z-10 h-auto" :style="isTitle" :class="toastStore().getToast.title === 'Error' ? 'bg-red-500 text-stone-900 top-[20px]' : 'bg-green-400  text-stone-900 top-[20px]'"  >
  <h3 class="text-[18px] font-bold">{{toastStore().getToast.title}}</h3>
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