import { useLayoutEffect, useRef } from 'react'
import { createGame } from '@/game'

/**
 * Cầu nối React -> Phaser: tạo game khi mount, hủy khi unmount.
 * An toàn với React StrictMode (dev mount 2 lần): mỗi lần mount có game riêng và được destroy đúng.
 * Giao tiếp tiếp theo đi qua EventBus, không truyền props vào game.
 */
export function PhaserGame() {
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    const game = createGame(containerRef.current)
    return () => game.destroy(true)
  }, [])

  return <div ref={containerRef} className="aspect-video w-full max-w-[1280px]" />
}
