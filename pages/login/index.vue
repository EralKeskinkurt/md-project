<template>
<div class="h-[91%] w-full bg-transparent flex justify-center py-5 px-44 items-center">
  <form @submit.prevent class="w-full h-full flex flex-col items-center justify-center gap-6">
    <div class="flex flex-col items-start justify-center gap-2">
      <label class="px-2" for="">E-mail</label>
      <input class="w-[250px] outline-none  focus:border-b-green-700/70 border-white border-[2px] rounded-md py-1 px-3" v-model="email" type="text">
    </div>
    <div class="flex flex-col items-start justify-center gap-2">
      <label  class="px-2" for="">Password</label>
      <input class="w-[250px] outline-none  focus:border-b-green-700/70 border-white border-[2px] rounded-md py-1 px-3" v-model="password" type="password">
    </div>
    <div class="flex items-start justify-start text-center overflow-hidden rounded-lg">
      <button @click="login" class="w-[125px] bg-green-500 text-black font-bold px-2 py-2 hover:bg-green-600/60">Login</button>
      <nuxt-link class="w-[125px] bg-emerald-800 hover:bg-emerald-800/60 text-white font-bold px-2 py-2" to="/register">Register</nuxt-link>
    </div>
  </form>
</div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})
import useAuthController from "~/composables/useAuthController";

const email = ref(null)
const password = ref(null);
const login = async () => {
  await useAuthController().signInUser(email.value, password.value);
  email.value = null
  password.value = null
}
</script>

