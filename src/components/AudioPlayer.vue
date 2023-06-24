<script setup lang="ts">
import { computed } from 'vue'
import { useAudio } from '@/composables/useAudio'
import { convertToDigitalFormat } from '@/utils'

const props = defineProps<{
  autoPlay: boolean
}>()

const {
  isMuted,
  totalTime,
  isPlaying,
  currentTime,
  togglePlayback,
  toggleVolume,
  goBackward,
  goForward
} = useAudio({ autoPlay: props.autoPlay })

const progressWidth = computed(() => `${(currentTime.value / totalTime.value) * 100}%`)
const digitalTimer = computed(() => {
  const formattedCurrentTime = convertToDigitalFormat(currentTime.value)
  const formattedTotalTime = convertToDigitalFormat(totalTime.value)
  return `${formattedCurrentTime}/${formattedTotalTime}`
})
</script>

<template>
  <div class="bg-black2 flex items-center gap-[0.3rem] w-fit h-[50] py-1 px-2.5 rounded-[9px]">
    <img
      class="hidden md:block lg:block cursor-pointer"
      src="@/assets/icons/backword.svg"
      @click="goBackward"
    />
    <img
      class="cursor-pointer"
      v-if="isPlaying"
      src="@/assets/icons/pause.svg"
      @click="togglePlayback"
    />
    <img
      class="cursor-pointer"
      v-if="!isPlaying"
      src="@/assets/icons/play.svg"
      @click="togglePlayback"
    />
    <img
      class="hidden md:block lg:block cursor-pointer"
      src="@/assets/icons/forward.svg"
      @click="goForward"
    />
    <slot
      name="timer"
      :currentTime="currentTime"
      :totalTime="totalTime"
      :digitalTimer="digitalTimer"
    >
      <span
        class="w-[3.5rem] mt-0.5 text-white font-[inter] text-[12px] font-normal leading-[0.9rem]"
        >{{ digitalTimer }}</span
      >
    </slot>
    <slot name="progress" :progress="progressWidth">
      <div class="hidden md:block lg:block w-[10.4rem] bg-white rounded-[3px] h-[5px]">
        <div class="bg-primary h-[5px] rounded-full" :style="{ width: progressWidth }"></div>
      </div>
    </slot>
    <img
      class="hidden md:block lg:block cursor-pointer"
      v-if="!isMuted"
      src="@/assets/icons/mute.svg"
      @click="toggleVolume"
    />
    <img
      class="hidden md:block lg:block cursor-pointer"
      v-if="isMuted"
      src="@/assets/icons/unmute.svg"
      @click="toggleVolume"
    />
  </div>
</template>

<style scoped></style>
