import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ImageComponent from './ResizableImageComponent'

export const ResizableImage = Node.create({
    name: 'resizableImage',

    group: 'inline', // 텍스트 사이에 넣기 위해 inline으로 설정
    inline: true, // 텍스트와 함께 삽입할 수 있도록 설정
    selectable: true,
    draggable: true, // 드래그 가능하게 설정

    addAttributes() {
        return {
            src: {},
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
            width: {
                default: 'auto',
            },
            height: {
                default: 'auto',
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'img[src]',
                getAttrs: dom => ({
                    src: dom.getAttribute('src'),
                    width: dom.getAttribute('width') || 'auto',
                    height: dom.getAttribute('height') || 'auto',
                }),
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['img', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageComponent)
    },
})
