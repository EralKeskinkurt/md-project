<template>
  <main  class="grid grid-cols-3 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-2 gap-2 max-sm:grid-cols-1 items-start mt-8 justify-between bg-transparent w-full">
    <nuxt-link  v-for="blog in blogs" :key="blog.mdTitle" :to="'/blogs/' + blog.mdTitle" class="w-auto border-[1px] border-white/20 rounded-sm py-2 px-5 bg-zinc-100/5">
      <div class="flex flex-col items-start justify-start gap-3 w-full text-white">
        <h1 class="text-xl font-bold">{{blog.mdTitle}}</h1>
        <div class="flex items-center justify-between gap-3 w-full">
          <img class="object-cover  w-[25px] h-[25px] rounded-full" :src="blog.userRef.photoUrl" alt="user photo">
          <h3 class="text-sm flex-grow font-semibold">{{blog.userRef.displayName}}</h3>
          <h3 class="flex items-center gap-1"><ViewsIcon/> {{blog.mdViews.length}}</h3>
        </div>
      </div>
    </nuxt-link>
  </main>
</template>

<script setup>
import {blogStore} from "~/store/blogStore";
import {Icon} from "#components";
const blogs = ref(null);
const ViewsIcon = h(Icon, { name: 'icon-park-outline:eyes'})
onMounted(async () => {
  await $fetch('/api/getAllMdBlog', {
    method: 'get'
  }).then(mdData => {
    blogStore().setBlogs(mdData)
    blogs.value = blogStore().getBlogs?.data;
  })
});

</script>