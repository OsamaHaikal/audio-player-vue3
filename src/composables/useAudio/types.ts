import type { Ref } from 'vue'

export interface UseAudioOutput {
  currentTime: Ref<number>
  totalTime: Ref<number>
  isPlaying: Ref<boolean>
  isMuted: Ref<boolean>

  togglePlayback: () => void
  toggleVolume: () => void
  goForward: () => void
  goBackward: () => void
}

export type UseAudioInput = {
  autoPlay: boolean
}
