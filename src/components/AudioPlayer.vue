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
  <div class="bg-black2 flex items-center gap-[0.3rem] h-[50px] py-1 px-2.5 rounded-[9px]">
    <button @click="goBackward">
      <img class="hidden md:block lg:block" src="@/assets/icons/backword.svg" />
    </button>
    <button v-show="isPlaying" @click="togglePlayback">
      <img src="@/assets/icons/pause.svg" />
    </button>
    <button v-show="!isPlaying" @click="togglePlayback">
      <img src="@/assets/icons/play.svg" />
    </button>
    <button @click="goForward">
      <img class="hidden md:block lg:block" src="@/assets/icons/forward.svg" />
    </button>
    <slot
      name="timer"
      :currentTime="currentTime"
      :totalTime="totalTime"
      :digitalTimer="digitalTimer"
    >
      <span
        class="w-[3.5rem] mt-0.5 text-white font-[inter] text-[12px] font-normal leading-[0.9rem]"
        >{{ digitalTimer }}
      </span>
    </slot>
    <slot name="progress" :progress="progressWidth">
      <div class="hidden md:block lg:block w-[10.4rem] bg-white rounded-[3px] h-[5px]">
        <div class="bg-primary h-[5px] rounded-full" :style="{ width: progressWidth }"></div>
      </div>
    </slot>
    <button v-show="!isMuted" @click="toggleVolume">
      <img class="hidden md:block lg:block" src="@/assets/icons/mute.svg" />
    </button>
    <button v-show="isMuted" @click="toggleVolume">
      <img class="hidden md:block lg:block" src="@/assets/icons/unmute.svg" />
    </button>
  </div>
</template>

<style scoped></style>
