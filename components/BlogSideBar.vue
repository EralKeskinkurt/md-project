<template>
<aside class="w-[30%] h-full bg-transparent sticky top-0 left-0">
  <div class="flex flex-col items-start w-full h-full justify-start">
    <BackIcon @click="useRouter().push('/')" class="w-full cursor-pointer bg-black/10 h-[60px] border-b-[1px] text-center border-b-white/10 text-[30px] text-white font-bold" />
    <div class="flex flex-wrap gap-10 px-2 items-center w-full justify-between mt-5">
     <div>
       <h1 class="text-[0.9rem] flex text-white items-center gap-1"> <ByAbout class="text-[1.1rem]" /> CREATED BY :</h1>
       <h3 class="text-[0.8rem] text-white/70">{{user?.displayName}}</h3>
     </div>
     <div>
       <h1 class="text-[0.9rem] flex text-white items-center gap-1 text-end"> CREATED TİME <Calender class="text-[1.1rem]" /> :</h1>
       <h3 class="text-[0.8rem] text-white/70">{{blog?.mdCreatedTime}}</h3>
     </div>
   </div>
    <div class="px-2 mt-10">
      <h1 class="text-[0.9rem] flex text-white items-center gap-1"><ViewsIcon class="text-[1.1rem]"/> VİEWS :</h1>
      <h3 class="text-[0.8rem] text-white/70">{{blog?.mdViews < 0  ? '0' : blog?.mdViews?.length}}</h3>
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
import {userCollection} from "~/store/userCollection";
import {useRouter} from "#app";
import {blogStore} from "~/store/blogStore";
const ByAbout = h(Icon, { name: 'material-symbols:accessibility-new' })
const Calender = h(Icon, { name: 'uim:calender' })
const ViewsIcon = h(Icon, { name: 'icon-park-outline:eyes'})
const BackIcon = h(Icon, { name: 'mdi:backspace'})
const blog = ref(null)
const user = ref(userCollection().getCurrentUser)
const slug = useRoute().params.slug;
watchEffect(() => {
  blog.value =  blogStore().getBlogs.data.find(md => md.mdTitle === slug)
})
</script>