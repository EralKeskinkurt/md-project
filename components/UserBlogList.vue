<template>
  <div class="relative w-[50%] h-full bg-[#1A1A1A] shadow-md overflow-y-auto overflow-x-auto">
    <table class="w-full text-sm text-left bg-[#1A1A1A] text-white relative ">
      <thead class="text-xs text-white/70 uppercase bg-[#1A1A1A] sticky top-0">
      <tr>
        <th scope="col" class="px-6 py-3">
          Blog Name
        </th>
        <th scope="col" class="px-6 py-3 text-end pr-10">
          Action
        </th>
      </tr>
      </thead>
      <tbody >
      <tr v-if="blogs"  v-for="blog in blogs" :key="blog.mdTitle" class="bg-white/5 h-auto border-b-[1px] border-white/5">
        <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap uppercase">
            {{blog.mdTitle}}
        </th>
        <td class="px-6 py-4 flex items-start justify-end gap-2">
          <nuxt-link :to="'/edit-[group]/' + blog.mdTitle" class="font-medium text-xl text-blue-300 hover:underline"><Icon name="material-symbols:edit-square" /></nuxt-link>
          <nuxt-link :to="'/blogs/' + blog.mdTitle" class="font-medium text-xl text-yellow-400 hover:underline"><Icon name="icon-park-outline:preview-open" /></nuxt-link>
          <button @click="deleteBlog(blog.mdTitle)" class="font-medium text-xl text-red-500 hover:underline"><Icon name="material-symbols:delete" /></button>
        </td>
      </tr>
      <tr v-if="!blogs" v-for="(item, index) in 10" class="bg-white/5">
        <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap ">
          <button class="bg-white/50 shadow shadow-white/40  animate-pulse">&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160&#160</button>
        </th>
        <td class="px-6 py-4 flex items-center justify-start gap-2">
          <a href="#" class="font-medium animate-pulse  bg-blue-300/30 text-blue-300">&#160&#160&#160</a>
          <a href="#" class="font-medium animate-pulse bg-yellow-400/30 text-yellow-400">&#160&#160&#160</a>
          <a href="#" class="font-medium animate-pulse  bg-red-500/30 text-red-500">&#160&#160&#160</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script setup>
import { userBlogStore } from "~/store/userBlogStore";
import {toastStore} from "~/store/toastStore";
import useFireStorage from "~/composables/useFireStorage";
const blogs = ref(null);


watchEffect(() => {
  blogs.value = userBlogStore().getBlogs?.data;
})

const deleteBlog = async (mdTitle) => {
  const deletedBlog = userBlogStore().getBlogs?.data;
  await $fetch('api/deleteBlog', {
    method: 'POST',
    body: {
      mdTitle: mdTitle
    }
  }).then(res => {
    toastStore().setToast('Success', res.message)
    userBlogStore().setBlogs({data:deletedBlog.filter(blog => blog.mdTitle !== mdTitle)})
  }).catch(error => {
    toastStore().setToast('Error', error.error)
  })
}
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>