<template>
  <div class="w-full h-[91%] relative overflow-hidden flex justify-end ">
    <BlogSideBar/>
    <main class=" w-[65%] bg-black text-white h-full pt-5 border-l-[1px] border-l-green-800/40 z-10 overflow-y-auto overflow-x-hidden">
      <ContentRendererMarkdown :value="content" v-if="content" class="md-container flex flex-col space-y-5 w-[100%] px-5 pb-10">
      </ContentRendererMarkdown>
    </main>
  </div>
</template>

<script setup>
import BlogSideBar from "~/components/BlogSideBar.vue";
import hjs from "highlight.js"
import "highlight.js/styles/obsidian.css"
definePageMeta({
  middleware: ["auth"],
});
const viewsIp = ref(null)
const content = ref(null)
const slug =  useRoute().params.slug;
onMounted( async () => {
   await useFireStorage().getMdFiles()
  content.value = await  useFireStorage().getContent(slug)
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
  hjs.highlightAll()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

code{
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 0.8rem !important;
}
.md-container {
  font-size: 0.9rem;
}

.md-container  h1{
  font-size: 2rem;
  font-weight: bold;
}
.md-container  h2{
  font-size: 1.8rem;
  font-weight: bold;
}
.md-container h3{
  font-size: 1.6rem;
  font-weight: bold;
}
.md-container h4{
  font-size: 1.4rem;
  font-weight: bold;
}
.md-container h5{
  font-size: 1.3rem;
  font-weight: bold;
}
.md-container h6{
  font-size: 1.2rem;
  font-weight: bold;
}

.md-container p{
  text-indent:15px;
}

.md-container p img{
  max-width: 85% !important;
  max-height: 500px !important;
  object-fit: cover;
  margin: 20px;
}

.md-container code {
  font-family: monospace;
}

.md-container blockquote {
  background: rgba(26, 25, 25, 0.36);
  border-left: 10px solid rgba(3, 3, 3, 0.8);
  margin: 1.5em 10px;
  color: white;
  padding: 0.5em 10px;
  quotes: "\201C""\201D""\2018""\2019";
}
.md-container blockquote:before {
  color: #1a1919;
  content: open-quote;
  font-size: 4em;
  line-height: 0.1em;
  margin-right: 0.25em;
  vertical-align: -0.4em;
}
.md-container blockquote p {
  display: inline;
}

.md-container hr{
  width: 100% !important;
  height: 2px !important;
  background: rgba(255, 255, 255, 0.56);
  opacity: 0.8;
  border:none;
}
.md-container ul > li > ul{
  margin-top:5px;
  margin-bottom: 5px;
  list-style: circle;
}
.md-container ul{
  max-width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  list-style: disc;
  font-size: 0.9rem;
}

.md-container table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.16);
}

.md-container th, td {
  text-align: left;
  padding: 8px;

}

.md-container th{
  background: rgba(3, 173, 3, 0.49);
  color: black;

}

.md-container td:first-child{font-weight: 700}
.md-container tr:nth-child(even){background-color: rgba(10, 173, 10, 0.2); color: #000000;}

.md-container ol{
  max-width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  list-style: decimal;
  font-size: 0.9rem;
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