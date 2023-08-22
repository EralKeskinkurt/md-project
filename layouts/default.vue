<template>
<div class="w-full h-screen flex justify-center items-center bg-zinc-200">
  <div class="w-[1000px] flex flex-col items-center justify-start bg-green-300 h-screen overflow-hidden relative">
    <Navbar />
    <Toast />
    <slot />
  </div>
</div>
</template>

<script setup>
</script>