<template>
<aside class="w-[35%] h-[300px] bg-transparent sticky top-0 left-0">
  <div class="flex flex-col items-start w-full justify-start px-2 pt-3 gap-5">
   <div class="flex items-center w-full justify-between">
     <div>
       <h1 class="text-[0.9rem] flex items-center gap-1"> <ByAbout class="text-[1.1rem]" /> CREATED BY :</h1>
       <h3 class="text-[0.8rem] text-black/70">Eral Keskinkurt</h3>
     </div>
     <div>
       <h1 class="text-[0.9rem] flex items-center gap-1 text-end"> CREATE TİME <Calender class="text-[1.1rem]" /> :</h1>
       <h3 class="text-[0.8rem] text-black/70">27.01.1999 09:20 am</h3>
     </div>
   </div>
    <div>
      <h1 class="text-[0.9rem] flex items-center gap-1"><ViewsIcon class="text-[1.1rem]"/> VİEWS :</h1>
      <h3 class="text-[0.8rem] text-black/70">{{!blog?.mdViews ? '0' : blog?.mdViews?.length}}</h3>
    </div>
  </div>
</aside>
</template>
<!---->
<!---->
<!---->
<script setup>
import {userBlogStore} from "@/store/userBlogStore"
import { Icon } from '#components'
const ByAbout = h(Icon, { name: 'material-symbols:accessibility-new' })
const Calender = h(Icon, { name: 'uim:calender' })
const ViewsIcon = h(Icon, { name: 'icon-park-outline:eyes'})
const blog = ref(null)
onMounted(async () => {
  const slug = useRoute().params.slug;
  blog.value = await userBlogStore().getBlogs?.data.find(blog => blog?.mdTitle === slug)
})
</script>