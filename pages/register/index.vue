<template>
  <div class="h-[85%] w-full bg-white/10 flex justify-center px-44 items-center">
    <form @submit.prevent class="w-full h-full flex text-white flex-col items-center justify-center gap-6">
      <div class="flex flex-col items-start justify-center gap-2">
        <label class="px-2 " for="">Full Name</label>
        <input class="w-[250px] outline-none bg-zinc-200/90 text-black font-bold rounded-sm py-1 px-3" required v-model="displayName" type="text">
      </div>
      <div class="flex flex-col items-start justify-center gap-2">
        <label class="px-2" for="">E-mail</label>
        <input class="w-[250px] outline-none bg-zinc-200/90 text-black font-bold rounded-sm py-1 px-3" required v-model="email" type="text">
      </div>
      <div class="flex flex-col items-start justify-center gap-2">
        <label  class="px-2" for="">Password</label>
        <input class="w-[250px] outline-none bg-zinc-200/90 text-black font-bold rounded-sm py-1 px-3" required v-model="password" type="password">
      </div>
      <div class="flex items-start justify-start text-center overflow-hidden rounded-lg">
        <button @click="registerClick" class="w-[125px] bg-black/40 text-white font-bold px-2 py-2 hover:bg-black/60">Register</button>
        <nuxt-link class="w-[125px] bg-white/40 hover:bg-white/60 text-black font-bold px-2 py-2" to="/login">Login</nuxt-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import {toastStore} from "~/store/toastStore";
import {useRouter} from "#app";
const router = useRouter();
import useAuthController from "/composables/useAuthController"
const email = ref(null);
const password = ref(null);
const displayName = ref(null);
const registerClick = async () => {
  if (String(email.value).match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
    if (String(password.value).match(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)){
     if (String(displayName.value).match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)){
       await useAuthController().createUser(email.value, password.value, displayName.value);
       email.value = null
       password.value = null
       displayName.value = null
     }else{
       toastStore().setToast('Error', "Invalid full name. Full name must start with a letter and can contain letters, spaces, hyphens, apostrophes, commas, and periods.")
     }
    }else{
      toastStore().setToast('Error', "Invalid password. Password must contain at least 6 characters, including at least one letter and one digit.")
    }
  }else{
    toastStore().setToast('Error', 'Invalid email address. Please enter a valid email address.')
  }
}
</script>
