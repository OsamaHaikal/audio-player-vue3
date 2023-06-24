import type { UseAudioInput, UseAudioOutput } from './types'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'

export function useAudio(options: UseAudioInput): UseAudioOutput {
  const currentTime = ref<number>(0)
  const totalTime = ref<number>(130)
  const isPlaying = ref<boolean>(false)
  const isMuted = ref<boolean>(false)
  const ended = computed(() => currentTime.value >= totalTime.value)
  const timer = ref<NodeJS.Timer>()

  onMounted(() => {
    if (options?.autoPlay) {
      isPlaying.value = true
    }
  })

  watch(currentTime, (newValue) => {
    if (newValue == totalTime.value) isPlaying.value = false
  })

  watchEffect(() => {
    if (isPlaying.value) {
      timer.value = setInterval(fakeProgress, 1000)
    } else {
      clearInterval(timer.value)
    }
  })

  const reset = () => {
    currentTime.value = 0
  }

  const fakeProgress = () => {
    currentTime.value += 1
  }

  const togglePlayback = () => {
    if (ended.value) reset()
    isPlaying.value = !isPlaying.value
  }

  const goForward = () => {
    if (ended.value) return
    if (totalTime.value - currentTime.value <= 5) {
      currentTime.value = totalTime.value - 5
    }

    currentTime.value += 5
  }

  const goBackward = () => {
    if (currentTime.value < 5) {
      currentTime.value = 0
    }
    if (currentTime.value > 0) {
      currentTime.value -= 5
    }
  }

  const toggleVolume = () => {
    isMuted.value = !isMuted.value
  }

  return {
    currentTime,
    totalTime,
    isPlaying,
    isMuted,
    togglePlayback,
    goForward,
    goBackward,
    toggleVolume
  }
}
