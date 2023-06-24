import { convertToDigitalFormat } from '@/utils'
import { describe, it, expect } from 'vitest'

describe('convertToDigitalFormat', () => {
  it('should convert 65 seconds to digital format correctly', () => {
    const result = convertToDigitalFormat(65)
    expect(result).toEqual('1:05')
  })

  it('should convert 3600 seconds to digital format correctly', () => {
    const result = convertToDigitalFormat(100)
    expect(result).toEqual('1:40')
  })

  it('should convert 123 seconds to digital format correctly', () => {
    const result = convertToDigitalFormat(130)
    expect(result).toEqual('2:10')
  })

  it('should convert 0 seconds to digital format correctly', () => {
    const result = convertToDigitalFormat(0)
    expect(result).toEqual('0:00')
  })
})
