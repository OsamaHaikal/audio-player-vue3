import { useAudio } from '../useAudio'
import { beforeEach, describe, it, expect } from 'vitest'
import type { UseAudioOutput } from '../useAudio/types'
import { withSetup } from '@/utils'

describe('useAudio', () => {
  let audio: UseAudioOutput

  beforeEach(() => {
    audio = withSetup<UseAudioOutput>(() => useAudio({ autoPlay: true }))
  })

  it('should be paused if autoPlay initial value is false', () => {
    audio = withSetup<UseAudioOutput>(() => useAudio({ autoPlay: false }))
    expect(audio.isPlaying.value).toBe(false)
  })

  it('should toggle playback state when calling togglePlayback', () => {
    audio.togglePlayback()
    expect(audio.isPlaying.value).toBe(false)
    audio.togglePlayback()
    expect(audio.isPlaying.value).toBe(true)
  })

  it('should increase currentTime by 8 seconds when calling goForward', () => {
    audio.currentTime.value = 3
    audio.goForward()
    expect(audio.currentTime.value).toBe(8)
  })

  it('should decrease currentTime by 8 seconds when calling goBackward', () => {
    audio.currentTime.value = 13
    audio.goBackward()
    expect(audio.currentTime.value).toBe(8)
  })

  it('should set currentTime to 0, after calling goBackward near zero or zero', () => {
    audio.currentTime.value = 3
    audio.goBackward()
    audio.goBackward()
    expect(audio.currentTime.value).toBe(0)
  })

  it('should set currentTime to totalTime, and stop playing after calling goForward before end or at end', () => {
    audio.currentTime.value = 3
    audio.totalTime.value = 5
    audio.goForward()
    audio.goForward()
    audio.goForward()
    expect(audio.currentTime.value).toBe(5)
  })

  it('should toggle isMuted when calling toggleVolume', () => {
    audio.toggleVolume()
    expect(audio.isMuted.value).toBe(true)
    audio.toggleVolume()
    expect(audio.isMuted.value).toBe(false)
  })
})
