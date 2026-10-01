import { useEffect, useEffectEvent, useRef } from 'react'

const interactiveSelector = 'a, button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"]), [role="button"], [role="link"], [role="slider"], [data-no-route-gesture]'

function blocksGesture(target, stage) {
  if (!(target instanceof Element) || target.closest(interactiveSelector)) return true

  // Leave nested horizontal scrollers (carousels, code, etc.) in control.
  for (let node = target; node && node !== stage; node = node.parentElement) {
    if (node.scrollWidth > node.clientWidth + 1 && /auto|scroll/.test(getComputedStyle(node).overflowX)) return true
  }
  return false
}

export default function useRouteGestures({ stageRef, pathname, routes, transitioning, navigate, duration }) {
  const lockedUntil = useRef(0)
  const canStart = useEffectEvent(() => routes.includes(pathname) && !transitioning && performance.now() >= lockedUntil.current)
  const step = useEffectEvent((direction) => {
    if (!canStart()) return
    const nextPathname = routes[routes.indexOf(pathname) + direction]
    if (!nextPathname) return
    // Lock synchronously, including the interval before the transition commits.
    lockedUntil.current = performance.now() + duration
    navigate(nextPathname)
  })

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined
    let pointer = null
    let suppressClickUntil = 0
    let wheelLastTime = 0
    let wheelDistance = 0
    let wheelUsed = false

    function pointerDown(event) {
      pointer = null
      if (!event.isPrimary) {
        return
      }
      // A new interaction is not the compatibility click from the last drag.
      suppressClickUntil = 0
      if (!canStart() || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || blocksGesture(event.target, stage)) return
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false }
    }

    function pointerMove(event) {
      if (!pointer || event.pointerId !== pointer.id) return
      const dx = event.clientX - pointer.x
      const dy = event.clientY - pointer.y
      if (!pointer.horizontal && Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) {
        pointer = null
        return
      }
      if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.6) {
        pointer.horizontal = true
        suppressClickUntil = performance.now() + 450
        if (event.cancelable) event.preventDefault()
        if (!stage.hasPointerCapture(event.pointerId)) stage.setPointerCapture(event.pointerId)
      }
    }

    function pointerUp(event) {
      if (!pointer || event.pointerId !== pointer.id) return
      const dx = event.clientX - pointer.x
      const dy = event.clientY - pointer.y
      if (pointer.horizontal) {
        suppressClickUntil = performance.now() + 450
        if (Math.abs(dx) >= 70 && Math.abs(dx) > Math.abs(dy) * 1.6) step(dx < 0 ? 1 : -1)
      }
      pointer = null
      if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId)
    }

    function cancelPointer() {
      pointer = null
      suppressClickUntil = 0
    }

    function lostPointerCapture(event) {
      // Touch starts with implicit capture on the original target. Its loss
      // bubbles when we transfer capture to the stage; that is not a cancel.
      if (event.target === stage && pointer?.id === event.pointerId) cancelPointer()
    }

    function suppressClick(event) {
      if (!stage.contains(event.target) || event.detail === 0 || performance.now() > suppressClickUntil) return
      event.preventDefault()
      event.stopImmediatePropagation()
      suppressClickUntil = 0
    }

    function preventNativeDrag(event) {
      // Eligibility was checked at pointerdown. Selected text can dispatch
      // dragstart from a Text node, so rechecking its target cancels swipes.
      if (pointer) event.preventDefault()
    }

    function wheel(event) {
      const now = performance.now()
      if (now - wheelLastTime > 240) {
        wheelDistance = 0
        wheelUsed = false
      }
      wheelLastTime = now
      if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey || blocksGesture(event.target, stage)) return
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) * 1.6 || !event.deltaX) {
        wheelDistance = 0
        return
      }
      // Consume only clearly horizontal input; vertical scroll and pinch remain native.
      if (!canStart() && !wheelUsed) return
      if (event.cancelable) event.preventDefault()
      if (wheelUsed) return
      const delta = event.deltaX * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stage.clientWidth : 1)
      if (Math.sign(delta) !== Math.sign(wheelDistance)) wheelDistance = 0
      wheelDistance += delta
      if (Math.abs(wheelDistance) < 100) return
      wheelUsed = true
      step(wheelDistance > 0 ? 1 : -1)
    }

    stage.addEventListener('pointerdown', pointerDown)
    stage.addEventListener('pointermove', pointerMove, { passive: false })
    stage.addEventListener('pointerup', pointerUp)
    stage.addEventListener('pointercancel', cancelPointer)
    stage.addEventListener('lostpointercapture', lostPointerCapture)
    stage.addEventListener('dragstart', preventNativeDrag)
    stage.addEventListener('wheel', wheel, { passive: false })
    window.addEventListener('click', suppressClick, true)
    return () => {
      stage.removeEventListener('pointerdown', pointerDown)
      stage.removeEventListener('pointermove', pointerMove)
      stage.removeEventListener('pointerup', pointerUp)
      stage.removeEventListener('pointercancel', cancelPointer)
      stage.removeEventListener('lostpointercapture', lostPointerCapture)
      stage.removeEventListener('dragstart', preventNativeDrag)
      stage.removeEventListener('wheel', wheel)
      window.removeEventListener('click', suppressClick, true)
    }
  }, [stageRef])
}
