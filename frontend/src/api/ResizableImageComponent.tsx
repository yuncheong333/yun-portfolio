// extensions/ResizableImageComponent.tsx
import React, { useRef, useState } from 'react'
import { NodeViewWrapper, NodeViewContent} from '@tiptap/react'

const ResizableImageComponent = ({ node, updateAttributes, selected, deleteNode, editor }) => {
    const { src, width, height } = node.attrs
    const [isResizing, setIsResizing] = useState(false)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const dragHandleRef = useRef<HTMLDivElement | null>(null)

    const startResizing = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsResizing(true)
        const startX = e.clientX
        const startWidth = imgRef.current?.offsetWidth || 0

        const onMouseMove = (moveEvent: MouseEvent) => {
            const newWidth = startWidth + (moveEvent.clientX - startX)
            updateAttributes({ width: `${newWidth}px` })
        }

        const onMouseUp = () => {
            setIsResizing(false)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
    }

    // 드래그 핸들 추가
    const startDrag = (e: React.DragEvent) => {
        e.dataTransfer.setData('text/plain', 'drag') // 빈 데이터 설정
        e.dataTransfer.effectAllowed = 'move' // 이동만 허용
    }

    return (
        <NodeViewWrapper
            className="resizable-image-wrapper"
            style={{ display: 'inline-block', position: 'relative' }}
            draggable="true"
            data-drag-handle // Tiptap이 이 요소를 드래그 핸들로 인식하도록 함
        >
            <img
                ref={imgRef}
                src={src}
                width={width}
                height={height}
                style={{ display: 'block', maxWidth: '100%', pointerEvents: 'none' }}
                alt=""
                draggable="false" // 이미지 자체는 드래그 안되게
            />
            {selected && (
                <>
                    <div
                        ref={dragHandleRef}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            cursor: 'move',
                            zIndex: 5,
                        }}
                        draggable="true"
                        onDragStart={startDrag}
                    />
                    <span
                        onMouseDown={startResizing}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: '12px',
                            height: '12px',
                            background: 'gray',
                            cursor: 'nwse-resize',
                            zIndex: 10,
                        }}
                    />
                </>
            )}
        </NodeViewWrapper>
    )
}

export default ResizableImageComponent