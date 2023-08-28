<template>
<nav class="w-full gap-16 flex justify-center items-start h-[8%] border-[1px]  border-white/10 rounded-xl text-white bg-zinc-300/10 backdrop-blur">
  <nuxt-link v-if="userCollection().getCurrentUser" class="font-bold h-full flex items-center" active-class="active" to="/md-create">Md Create</nuxt-link>
  <nuxt-link v-if="userCollection().getCurrentUser" class="font-bold h-full flex items-center" active-class="active" to="/blogs" >Blogs</nuxt-link>
  <nuxt-link v-if="userCollection().getCurrentUser" class="font-bold h-full flex items-center" active-class="active" to="/" >Profile</nuxt-link>
  <nuxt-link class="font-bold h-full flex items-center" active-class="active" to="/helpers" >Helpers</nuxt-link>
  <nuxt-link v-if="!userCollection().getCurrentUser" class="font-bold h-full flex items-center" active-class="active" to="/login" >Login</nuxt-link>
  <span v-if="userCollection().getCurrentUser" @click="logOut" class="font-bold cursor-pointer h-full flex items-center" >Logout</span>
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
  color: #25c963;
  opacity: 0.5;
  pointer-events: none;
}
</style>