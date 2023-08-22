<template>
<nav class="w-full gap-10 flex justify-center items-center h-[9%] bg-green-900/40 backdrop-blur overflow-hidden">
  <nuxt-link v-if="userCollection().getCurrentUser" class="font-bold group text-green-900 top-3 relative overflow-x-hidden h-full" active-class="active" to="/"><span class="absolute  bg-green-900 rounded-3xl group-hover:left-0 hover:transition  duration-500 -left-[140px] w-full h-[5px] top-6"></span>MD CREATE</nuxt-link>
  <nuxt-link v-if="userCollection().getCurrentUser" class="font-bold group text-green-900 top-3 relative overflow-x-hidden h-full" active-class="active" to="/blogs" ><span class="absolute  bg-green-900 rounded-3xl group-hover:left-0 hover:transition  duration-500 -left-[60px] w-full h-[5px] top-6"></span>BLOGS</nuxt-link>
  <nuxt-link v-if="userCollection().getCurrentUser" class="font-bold group text-green-900 top-3 relative overflow-x-hidden h-full" active-class="active" to="/profile" ><span class="absolute  bg-green-900 rounded-3xl group-hover:left-0 hover:transition  duration-500 -left-[80px] w-full h-[5px] top-6"></span>PROFILE</nuxt-link>
  <nuxt-link class="font-bold group text-green-900 top-3 relative overflow-x-hidden h-full" active-class="active" to="/helpers" ><span class="absolute  bg-green-900 rounded-3xl group-hover:left-0 hover:transition  duration-500 -left-[80px] w-full h-[5px] top-6"></span>HELPERS</nuxt-link>
  <nuxt-link v-if="!userCollection().getCurrentUser" class="font-bold group text-green-900 top-3 relative overflow-x-hidden h-full" active-class="active" to="/login" ><span class="absolute  bg-green-900 rounded-3xl group-hover:left-0 hover:transition  duration-500 -left-[60px] w-full h-[5px] top-6"></span>LOGIN</nuxt-link>
  <span v-if="userCollection().getCurrentUser" @click="logOut" class="font-bold group text-green-900 cursor-pointer top-3 relative overflow-x-hidden h-full" ><span class="absolute  bg-green-900 rounded-3xl group-hover:left-0 hover:transition  duration-500 -left-[70px] w-full h-[5px] top-6"></span>LOGOUT</span>
</nav>
</template>

<script setup>
import useFirebase from "~/composables/useAuthController";
import {userCollection} from "~/store/userCollection";

const logOut = async () => {
  await useFirebase().signOut();
}
</script>

<style scoped>
.active{
  color: #14532D;
  opacity: 0.5;
  pointer-events: none;
}
</style>