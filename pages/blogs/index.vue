<template>
  <div class="flex flex-col w-full h-[85%] items-center justify-start overflow-y-auto ">
    <div class="w-full h-[7%] px-10 flex items-center justify-center mt-10">
      <label for="search" class="w-[40%] h-full  flex justify-center items-start ">
        <input type="text" id="search" placeholder="Search" class="flex-1 py-2 text-black placeholder-black/70 bg-zinc-200 px-5 outline-none h-full">
        <SearchIcon size="70px" class="flex-none h-full  bg-white/20  cursor-pointer text-white" />
      </label>
    </div>
    <BlogList />
  </div>

</template>

<script setup>
import BlogList from "~/components/BlogList";
import {Icon} from "#components";
const SearchIcon = h(Icon, { name: 'material-symbols:search'})
definePageMeta({
  middleware: ['auth']
})
</script>
