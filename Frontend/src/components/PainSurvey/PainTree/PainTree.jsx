import { useRef, useLayoutEffect, useCallback, useState } from 'react'
import PainTreeNode from '../PainTreeNode/PainTreeNode'
import './PainTree.css'

export default function PainTree({ tree, selectedIds, expandedIds, onToggle, onExpand }) {
  const containerRef = useRef(null)
  const nodeRefs = useRef(new Map())
  const [lines, setLines] = useState([])

  const registerRef = useCallback((id, el) => {
    nodeRefs.current.set(id, el)
  }, [])

  const calcLines = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const box = container.getBoundingClientRect()
    const newLines = []

    const rootEl = nodeRefs.current.get(tree.id)
    if (!rootEl) return

    const rootRect = rootEl.getBoundingClientRect()
    const rootX = rootRect.left + rootRect.width / 2 - box.left
    const rootY = rootRect.bottom - box.top

    for (const child of tree.children) {
      const childEl = nodeRefs.current.get(child.id)
      if (!childEl) continue
      const cr = childEl.getBoundingClientRect()
      const cx = cr.left + cr.width / 2 - box.left
      const cy = cr.top - box.top

      newLines.push({ x1: rootX, y1: rootY, x2: cx, y2: cy, key: `root-${child.id}` })

      if (child.children && expandedIds.has(child.id)) {
        const parentY = cr.bottom - box.top
        for (const leaf of child.children) {
          const leafEl = nodeRefs.current.get(leaf.id)
          if (!leafEl) continue
          const lr = leafEl.getBoundingClientRect()
          newLines.push({
            x1: cx,
            y1: parentY,
            x2: lr.left + lr.width / 2 - box.left,
            y2: lr.top - box.top,
            key: `${child.id}-${leaf.id}`,
          })
        }
      }
    }

    setLines(newLines)
  }, [tree, expandedIds])

  useLayoutEffect(() => {
    calcLines()
  }, [calcLines, selectedIds, expandedIds])

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return
    const ro = new ResizeObserver(calcLines)
    ro.observe(container)
    return () => ro.disconnect()
  }, [calcLines])

  const handleTransitionEnd = useCallback(() => {
    calcLines()
  }, [calcLines])

  const handleNodeClick = (node) => {
    if (node.children) {
      onExpand(node.id)
    } else {
      onToggle(node.id)
    }
  }

  return (
    <div className="pt" ref={containerRef}>
      <svg className="pt__svg">
        {lines.map(l => (
          <line
            key={l.key}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            className="pt__line"
          />
        ))}
      </svg>

      <div className="pt__root-row">
        <PainTreeNode
          id={tree.id}
          label={tree.label}
          isRoot
          registerRef={registerRef}
        />
      </div>

      <div className="pt__branches">
        {tree.children.map(child => (
          <div key={child.id} className="pt__branch">
            <PainTreeNode
              id={child.id}
              label={child.label}
              selected={selectedIds.has(child.id)}
              expanded={expandedIds.has(child.id)}
              hasChildren={!!child.children}
              onClick={() => handleNodeClick(child)}
              registerRef={registerRef}
            />
            {child.children && (
              <div
                className={`pt__leaves${expandedIds.has(child.id) ? ' pt__leaves--open' : ''}`}
                onTransitionEnd={handleTransitionEnd}
              >
                {child.children.map(leaf => (
                  <PainTreeNode
                    key={leaf.id}
                    id={leaf.id}
                    label={leaf.label}
                    selected={selectedIds.has(leaf.id)}
                    onClick={() => onToggle(leaf.id)}
                    registerRef={registerRef}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
