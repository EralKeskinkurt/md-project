<template>
<div class="h-[85%] w-full bg-white/10 flex justify-center py-5 px-44 items-center">
  <form @submit.prevent class="w-full h-full flex flex-col items-center justify-center gap-6">
    <div class="flex flex-col items-start justify-center gap-2">
      <label class="px-2 text-white" for="">E-mail</label>
      <input class="w-[250px] outline-none bg-zinc-200/90 text-black font-bold rounded-sm py-1 px-3" v-model="email" type="text">
    </div>
    <div class="flex flex-col items-start justify-center gap-2">
      <label  class="px-2 text-white" for="">Password</label>
      <input class="w-[250px] outline-none bg-zinc-200/90 text-black font-bold rounded-sm py-1 px-3" v-model="password" type="password">
    </div>
    <div class="flex items-start justify-start text-center overflow-hidden rounded-lg">
      <button @click="login" class="w-[125px] bg-black/40 text-white font-bold px-2 py-2 hover:bg-black/60">Login</button>
      <nuxt-link class="w-[125px] bg-white/40 hover:bg-white/60 text-black font-bold px-2 py-2" to="/register">Register</nuxt-link>
    </div>
  </form>
</div>
</template>

<script setup>
import {toastStore} from "~/store/toastStore";

definePageMeta({
  middleware: ['auth']
})
import useAuthController from "~/composables/useAuthController";

const email = ref(null)
const password = ref(null);
const login = async () => {
  if (email.value && password.value){
    await useAuthController().signInUser(email.value, password.value);
    email.value = null
    password.value = null
  }else{
    toastStore().setToast('Error', "Email or password not be empty")
  }
}
</script>

