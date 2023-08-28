<template>
<div class="w-full h-screen flex justify-center items-center bg-black">
  <div class="w-[70%] max-xl:w-[70%] max-lg:w-[100%] max-md:w-[100%] max-sm:w-[100%] h-full flex gap-6 flex-col items-center justify-end bg-black overflow-hidden relative">
    <Navbar />
    <Toast />
    <slot />
  </div>
</div>
</template>

<script setup>
</script>