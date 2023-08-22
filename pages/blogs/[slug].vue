<template>
  <div class="w-full h-[91%] relative overflow-hidden flex justify-end ">
    <BlogSideBar/>
    <LoadingPage />
    <main class="w-[65%] h-full pt-5 border-l-[1px] border-l-green-800/40 z-10 overflow-y-auto">
      <ContentRendererMarkdown :value="content" v-if="content" class="flex flex-col space-y-5 w-[100%] px-5 pb-10" />
    </main>
  </div>
</template>

<script setup>
import BlogSideBar from "~/components/BlogSideBar.vue";
import LoadingPage from "~/components/LoadingPage.vue";
definePageMeta({
  middleware: ["auth"],
});
const content = ref(null)
onMounted(async () => {
  const slug = await useRoute().params.slug;
  await useFireStorage().getMdFiles()
  content.value = await useFireStorage().getContent(slug)
  await $fetch('https://api.ipify.org/?format=json', {
  }).then((data)=> {
    $fetch('/api/viewsCounter', {
      method:'POST',
      body: slug,
      headers: {
        'x-forwarded-for': data?.ip
      }
    })
  })
})
</script>

<style>
h1{
  font-size: 2rem;
  font-weight: bold;
}
h2{
  font-size: 1.8rem;
  font-weight: bold;
}
h3{
  font-size: 1.6rem;
  font-weight: bold;
}
h4{
  font-size: 1.4rem;
  font-weight: bold;
}
h5{
  font-size: 1.3rem;
  font-weight: bold;
}
h6{
  font-size: 1.2rem;
  font-weight: bold;
}

p{
  text-indent:15px;
}

p img{
  max-width: 85% !important;
  max-height: 500px !important;
  object-fit: cover;
}

ul{
  max-width: 70%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  list-style: disc;
  font-size: 1.2rem;
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