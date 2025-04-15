import '../styles/PostEditor.css'
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import React from 'react'
import MenuBar from '../components/MenuBar'
import { Image } from '@tiptap/extension-image'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'
import html from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import java from 'highlight.js/lib/languages/java'

const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
lowlight.register('java', java)

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle,
    StarterKit.configure({
        codeBlock: false,
    }),
    Image,
    CodeBlockLowlight.configure({
        lowlight,
    }),
]

const PostEditor = () => {
    const editor = useEditor({
        extensions,
        content: `<h2>Hello 👋</h2><p>Select me to see the bubble menu!</p>`,
    })

    if (!editor) return null

    return (
        <div className="post-editor-container">
            {/* MenuBar 컴포넌트 사용 */}
            <MenuBar editor={editor} />

            <div className="editor-area">
                {/* BubbleMenu 추가 */}
                <BubbleMenu editor={editor} tippyOptions={{duration: 100, appendTo: "parent"}}>
                    <div className="bubble-menu">
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={editor.isActive('bold') ? 'is-active' : ''}
                        >
                            굵게
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={editor.isActive('italic') ? 'is-active' : ''}
                        >
                            기울이기
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={editor.isActive('strike') ? 'is-active' : ''}
                        >
                            밑줄
                        </button>

                    </div>
                </BubbleMenu>

                {/* FloatingMenu 추가 */}
                <FloatingMenu editor={editor} tippyOptions={{duration: 100, appendTo: "parent"}}>
                    <div className="floating-menu">
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                            className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}
                        >
                            H1
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                            className={editor.isActive('heading', {level: 2}) ? 'is-active' : ''}
                        >
                            H2
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive('bulletList') ? 'is-active' : ''}
                        >
                            점 리스트
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                            className={editor.isActive('bulletList') ? 'is-active' : ''}
                        >
                            수평선
                        </button>
                    </div>
                </FloatingMenu>

                {/* EditorContent 영역 */}
                <EditorContent editor={editor}/>
            </div>
        </div>
    )
}

export default PostEditor
