<template>
  <div v-show="show" class="absolute w-full h-full bg-gray-500 text-4xl text-black text-center z-10">
    Loading...
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const show = ref(false);

addRouteMiddleware('global-loader', () => {
  show.value = true
}, {
  global: true
})

nuxtApp.hook('page:finish', () => { show.value = false; })
</script>