import { useEffect, useEffectEvent, useLayoutEffect, useRef } from 'react'

const controls = 'form, button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"]), [role="button"], [role="slider"], [data-no-route-gesture], nav a'
const axisThreshold = 9
const axisRatio = 1.5
const longPressDuration = 450

function blocksGesture(target, root, mouse = false) {
  if (!(target instanceof Element) || target.closest(controls) || (mouse && target.closest('a, [role="link"]'))) return true
  // Leave independently scrolling content in control, including vertical forms/panels.
  for (let node = target; node && node !== root; node = node.parentElement) {
    const style = getComputedStyle(node)
    if ((node.scrollWidth > node.clientWidth + 1 && /auto|scroll/.test(style.overflowX)) ||
        (node.scrollHeight > node.clientHeight + 1 && /auto|scroll/.test(style.overflowY))) return true
  }
  return false
}

function hasSelection() {
  const selection = window.getSelection()
  return selection && !selection.isCollapsed
}

function hitsText(x, y) {
  // Hit-test glyphs, not whole heading boxes: whitespace remains draggable.
  let range
  if (document.caretPositionFromPoint) {
    const caret = document.caretPositionFromPoint(x, y)
    if (!caret || caret.offsetNode.nodeType !== Node.TEXT_NODE) return false
    range = document.createRange()
    range.setStart(caret.offsetNode, caret.offset)
  } else {
    range = document.caretRangeFromPoint?.(x, y)
  }
  if (!range || range.startContainer.nodeType !== Node.TEXT_NODE) return false
  const text = range.startContainer
  const offset = range.startOffset
  for (const index of [offset, offset - 1]) {
    if (index < 0 || index >= text.length || !/\S/.test(text.data[index])) continue
    range.setStart(text, index)
    range.setEnd(text, index + 1)
    for (const rect of range.getClientRects()) {
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) return true
    }
  }
  return false
}

export default function useRouteGestures({ rootRef, stageRef, pathname, routes, transitioning, navigate, duration }) {
  const lockedUntil = useRef(0)
  const primary = routes.includes(pathname)
  const isPrimaryRoute = useEffectEvent(() => primary)
  const canStart = useEffectEvent(() => primary && !transitioning && performance.now() >= lockedUntil.current)
  const step = useEffectEvent((direction, metadata = {}) => {
    if (!canStart()) return false
    const nextPathname = routes[routes.indexOf(pathname) + direction]
    if (!nextPathname) return false
    lockedUntil.current = performance.now() + duration
    navigate(nextPathname, metadata)
    return true
  })
  const atBound = useEffectEvent((dx) => !routes[routes.indexOf(pathname) + (dx < 0 ? 1 : -1)])

  useLayoutEffect(() => {
    // Keep the release offset until the replacement frame has actually committed.
    const stage = stageRef.current
    stage?.style.removeProperty('--route-drag-x')
    stage?.removeAttribute('data-dragging')
    stage?.removeAttribute('data-settling')
  }, [pathname, stageRef])

  useEffect(() => {
    if (!primary) return undefined
    // The clipped stage is not the viewport's scroll container.
    const elements = [document.documentElement, document.body]
    const previous = elements.map((element) => ({ value: element.style.getPropertyValue('overscroll-behavior-x'), priority: element.style.getPropertyPriority('overscroll-behavior-x') }))
    elements.forEach((element) => element.style.setProperty('overscroll-behavior-x', 'none'))
    return () => elements.forEach((element, index) => {
      if (previous[index].value) element.style.setProperty('overscroll-behavior-x', previous[index].value, previous[index].priority)
      else element.style.removeProperty('overscroll-behavior-x')
    })
  }, [primary])

  useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    if (!root || !stage) return undefined
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let gesture = null
    let suppressClickUntil = 0
    let settleTimer = 0
    let wheelLastTime = 0
    let wheelDistance = 0
    let wheelUsed = false

    function resetPreview() {
      window.clearTimeout(settleTimer)
      stage.removeAttribute('data-dragging')
      stage.removeAttribute('data-settling')
      stage.style.removeProperty('--route-drag-x')
    }

    function settlePreview() {
      stage.removeAttribute('data-dragging')
      stage.setAttribute('data-settling', 'true')
      stage.style.setProperty('--route-drag-x', '0px')
      window.clearTimeout(settleTimer)
      settleTimer = window.setTimeout(resetPreview, reducedMotion.matches ? 0 : 220)
    }

    function releaseCapture(current) {
      if (current?.kind === 'pointer' && root.hasPointerCapture(current.id)) root.releasePointerCapture(current.id)
    }

    function cancelGesture() {
      const current = gesture
      gesture = null
      releaseCapture(current)
      if (current?.axis === 'horizontal') settlePreview()
    }

    function begin(kind, id, x, y, target) {
      cancelGesture()
      // A fresh interaction is never the previous drag's compatibility click.
      suppressClickUntil = 0
      if (!canStart() || hasSelection() || blocksGesture(target, root, kind === 'pointer') || (kind === 'pointer' && hitsText(x, y))) return
      resetPreview()
      gesture = { kind, id, x, y, offset: 0, axis: null, started: performance.now() }
    }

    function move(x, y, event) {
      if (!gesture) return
      if (!canStart() || event.defaultPrevented) {
        cancelGesture()
        return
      }
      const dx = x - gesture.x
      const dy = y - gesture.y
      if (!gesture.axis) {
        if (event.defaultPrevented || hasSelection() || (gesture.kind === 'touch' && performance.now() - gesture.started > longPressDuration)) {
          cancelGesture()
          return
        }
        if (Math.max(Math.abs(dx), Math.abs(dy)) < axisThreshold) return
        // Ambiguous or vertical-first motion belongs to native scrolling permanently.
        if (Math.abs(dx) <= Math.abs(dy) * axisRatio) {
          cancelGesture()
          return
        }
        // Once native scrolling owns a noncancelable touch, do not navigate on release.
        if (gesture.kind === 'touch' && !event.cancelable) {
          cancelGesture()
          return
        }
        gesture.axis = 'horizontal'
        stage.setAttribute('data-dragging', 'true')
        if (gesture.kind === 'pointer' && !root.hasPointerCapture(gesture.id)) root.setPointerCapture(gesture.id)
      }
      if (event.cancelable) event.preventDefault()
      const limit = Math.min(window.innerWidth * 0.32, 240)
      gesture.offset = reducedMotion.matches ? 0 : atBound(dx) ? Math.max(-36, Math.min(36, dx * 0.15)) : Math.max(-limit, Math.min(limit, dx * 0.65))
      stage.style.setProperty('--route-drag-x', `${gesture.offset}px`)
    }

    function finish(x) {
      const current = gesture
      gesture = null
      releaseCapture(current)
      if (!current || current.axis !== 'horizontal') return
      suppressClickUntil = performance.now() + 500
      const dx = x - current.x
      // Direction is locked: later vertical drift must not reject a deliberate swipe.
      if (Math.abs(dx) >= 70 && step(dx < 0 ? 1 : -1, { dragOffset: current.offset, outgoingScrollY: window.scrollY })) return
      settlePreview()
    }

    function touchStart(event) {
      if (event.touches.length !== 1) {
        cancelGesture()
        return
      }
      suppressClickUntil = 0
      if (event.defaultPrevented) return
      const touch = event.touches[0]
      begin('touch', touch.identifier, touch.clientX, touch.clientY, event.target)
    }

    function touchMove(event) {
      if (gesture?.kind !== 'touch') return
      if (event.touches.length !== 1) {
        cancelGesture()
        return
      }
      const touch = Array.from(event.touches).find((item) => item.identifier === gesture.id)
      if (touch) move(touch.clientX, touch.clientY, event)
    }

    function touchEnd(event) {
      if (gesture?.kind !== 'touch') return
      const touch = Array.from(event.changedTouches).find((item) => item.identifier === gesture.id)
      if (touch) finish(touch.clientX)
    }

    function pointerDown(event) {
      if (event.pointerType === 'touch') return
      suppressClickUntil = 0
      if (event.defaultPrevented || !event.isPrimary || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return
      begin('pointer', event.pointerId, event.clientX, event.clientY, event.target)
    }

    function pointerMove(event) {
      if (gesture?.kind === 'pointer' && event.pointerId === gesture.id) move(event.clientX, event.clientY, event)
    }

    function pointerUp(event) {
      if (gesture?.kind === 'pointer' && event.pointerId === gesture.id) finish(event.clientX)
    }

    function pointerCancel(event) {
      if (gesture?.kind === 'pointer' && event.pointerId === gesture.id) cancelGesture()
    }

    function lostPointerCapture(event) {
      if (event.target === root && gesture?.kind === 'pointer' && event.pointerId === gesture.id) cancelGesture()
    }

    function suppressClick(event) {
      if (!root.contains(event.target) || event.detail === 0 || performance.now() > suppressClickUntil) return
      event.preventDefault()
      event.stopImmediatePropagation()
      suppressClickUntil = 0
    }

    function preventNativeDrag(event) {
      // Only eligible background/image mouse gestures; never selected text or links.
      if (gesture?.kind === 'pointer') event.preventDefault()
    }

    function wheel(event) {
      if (!isPrimaryRoute()) return
      const now = performance.now()
      if (now - wheelLastTime > 240) {
        wheelDistance = 0
        wheelUsed = false
      }
      wheelLastTime = now
      if (event.defaultPrevented || event.ctrlKey || event.shiftKey || event.altKey || event.metaKey || blocksGesture(event.target, root)) return
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) * axisRatio || !event.deltaX) {
        wheelDistance = 0
        return
      }
      if (!canStart() && !wheelUsed) return
      if (event.cancelable) event.preventDefault()
      if (wheelUsed) return
      const delta = event.deltaX * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? root.clientWidth : 1)
      if (Math.sign(delta) !== Math.sign(wheelDistance)) wheelDistance = 0
      wheelDistance += delta
      if (Math.abs(wheelDistance) < 100) return
      wheelUsed = true
      step(wheelDistance > 0 ? 1 : -1, { outgoingScrollY: window.scrollY })
    }

    root.addEventListener('touchstart', touchStart, { passive: true })
    root.addEventListener('touchmove', touchMove, { passive: false })
    root.addEventListener('touchend', touchEnd)
    root.addEventListener('touchcancel', cancelGesture)
    root.addEventListener('pointerdown', pointerDown)
    root.addEventListener('dragstart', preventNativeDrag)
    root.addEventListener('wheel', wheel, { passive: false })
    // Mouse can leave the app before capture is established.
    window.addEventListener('pointermove', pointerMove, { passive: false })
    window.addEventListener('pointerup', pointerUp)
    window.addEventListener('pointercancel', pointerCancel)
    root.addEventListener('lostpointercapture', lostPointerCapture)
    window.addEventListener('click', suppressClick, true)
    return () => {
      cancelGesture()
      resetPreview()
      root.removeEventListener('touchstart', touchStart)
      root.removeEventListener('touchmove', touchMove)
      root.removeEventListener('touchend', touchEnd)
      root.removeEventListener('touchcancel', cancelGesture)
      root.removeEventListener('pointerdown', pointerDown)
      root.removeEventListener('dragstart', preventNativeDrag)
      root.removeEventListener('wheel', wheel)
      window.removeEventListener('pointermove', pointerMove)
      window.removeEventListener('pointerup', pointerUp)
      window.removeEventListener('pointercancel', pointerCancel)
      root.removeEventListener('lostpointercapture', lostPointerCapture)
      window.removeEventListener('click', suppressClick, true)
    }
  }, [rootRef, stageRef])
}
