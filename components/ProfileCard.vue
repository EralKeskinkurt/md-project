<template>
<div class="w-[50%] bg-white/10 flex flex-col gap-2 py-8 justify-start items-center h-full border-r-[1px] border-r-black/50">
  <div class="relative">
    <div>
      <img v-if="image || img_url" :src="img_url ? img_url : image" alt="profile image" class="w-28 object-cover rounded-full border-[2px] border-white/50 h-28">
      <Icon v-else class="text-[100px] text-white" name="material-symbols:account-circle-full"/>
    </div>
    <label for="image">
      <input type="file" id="image" class="hidden" @change="uploadImage">
      <Icon  name="material-symbols:add-photo-alternate-outline"  class="absolute -bottom-2 right-4 rounded-full  text-white bg-gray-600 cursor-pointer hover:bg-gray-600/70 p-1 text-3xl"/>
    </label>
  </div>
    <h1 class="text-white text-[20px] font-bold mt-5">{{userCollection().getCurrentUser?.displayName}}</h1>
    <h1 class="text-white/70 text-[14px] font-light">{{userCollection().getCurrentUser?.email}}</h1>
  <div class="flex items-center justify-center gap-4">
    <button v-if="img_url" @click="updateUser" class="w-auto h-auto p-2 bg-green-600 rounded-sm mt-5 font-bold">Update Profile</button>
    <button v-if="img_url" @click="img_url = null" class="w-auto h-auto p-2 bg-red-600 rounded-sm mt-5 font-bold">Cancel</button>
  </div>
</div>
</template>
<script setup>
import useFireStorage from "~/composables/useFireStorage";
import {userCollection} from "@/store/userCollection";
const coverFile = ref(null)
const img_url = ref(null);
const image = ref(userCollection().getCurrentUser.photoUrl)
const uploadImage = async (event) => {
  img_url.value = await null;
  let reader = new FileReader();
  if (event.target.files.length) {
    coverFile.value = await event.target.files[0]
    reader.onloadend = async (e) => {
      img_url.value = await reader.result
    }
    await reader.readAsDataURL(coverFile.value)
  }
}
const updateUser = async () => {
  await useFireStorage().updateUserProfile({
    file: coverFile.value,
    displayName: userCollection().getCurrentUser.displayName,
    email: userCollection().getCurrentUser.email
  }).then(res =>{
    image.value = img_url.value
    img_url.value = null
  }).catch(error => {
    img_url.value = null
  })
}

</script>
<style>

</style>