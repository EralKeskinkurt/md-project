<template>
  <div class="w-full h-full relative overflow-hidden flex justify-between items-center ">
    <BlogSideBar/>
    <div class="!w-[70%] h-full border-l-[1px] text-white border-l-white/50 !pl-10 !pr-10 !overflow-y-auto ">
      <MdEditor language="en-US" theme="dark" class="!w-full md-cont" v-model="content.mdText" preview-only />
    </div>
  </div>
</template>

<script setup>
import MdEditor from "md-editor-v3"
import 'md-editor-v3/lib/style.css';
import BlogSideBar from "~/components/BlogSideBar.vue";
import {useRoute} from "#app"
import {blogStore} from "~/store/blogStore";
definePageMeta({
  middleware: ["auth"],
  layout:'form-layout'
});
const viewsIp = ref(null)
const content = ref(" ")
const slug =  useRoute().params.slug;
onMounted( async () => {
  await $fetch('/api/getAllMdBlog', {
    method: 'get'
  }).then(mdData => {
    blogStore().setBlogs(mdData)
    content.value =  blogStore().getBlogs.data.find(md => md.mdTitle === slug)
  })
  await $fetch('https://api.ipify.org/?format=json', {
    }).then((data)=> {
    viewsIp.value = data.ip
    $fetch('/api/viewsCounter', {
      method:'post',
      body:{
        'x-forwarded-for': viewsIp?.value,
        'body': slug,
      },
    })
    })
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
.figure img{
  width: 100% !important;
  padding: 20px;
}
.md-cont p, strong, li, tr, th{
  color: #e1e0e0 !important;
}


code{
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 0.8rem !important;
}
.md-previewOnly{
  width: 100% !important;
}
.default-theme h1 a{
  font-size: 2rem !important;
  font-weight: bold !important;
  color: white !important;
}
.default-theme h2 a{
  font-size: 1.8rem !important;
  font-weight: bold !important;
  color: white !important;
}
.default-theme h3 a{
  font-size: 1.6rem !important;
  font-weight: bold !important;
  color: white !important;
}
.default-theme h4 a{
  font-size: 1.4rem !important;
  font-weight: bold !important;
  color: white !important;
}
.default-theme h5 a{
  font-size: 1.3rem !important;
  font-weight: bold !important;
  color: white !important;
}
.default-theme h6 a{
  font-size: 1.2rem !important;
  font-weight: bold !important;
  color: white !important;
}
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