<script setup lang="ts">
import AudioPlayer from '@/components/AudioPlayer.vue'
</script>

<template>
  <main class="bg-black2 h-screen grid place-items-center">
    <div
      class="bg-white shadow-lg flex items-center justify-center rounded-lg lg:w-[30%] md:w-[60%] sm:w-[50%] p-10"
    >
      <div class="flex flex-col gap-3">
        <AudioPlayer :auto-play="false" />
        <AudioPlayer :auto-play="true" />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
