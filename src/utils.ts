import { createApp } from 'vue'

export function convertToDigitalFormat(seconds: number) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(1, '0')
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')
  return `${mins}:${secs}`
}

export function withSetup<O>(composable: () => O): O {
  let result
  const app = createApp({
    setup() {
      result = composable()
      return () => {}
    }
  })
  app.mount(document.createElement('div'))
  if (result) return result

  return {} as O
}
