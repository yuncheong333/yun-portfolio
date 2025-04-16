import React from 'react'
import {Editor} from '@tiptap/react'

interface MenuBarProps {
    editor: Editor
}

const MenuBar: React.FC<MenuBarProps> = ({editor}) => {
    if (!editor) return null

    return (
        <div className="post-editor-wrapper">
            <div className="control-group">
                <div className="button-group">
                    <button onClick={() => editor.chain().focus().toggleBold().run()}
                            className={editor.isActive('bold') ? 'is-active' : ''}>굵게
                    </button>
                    <button onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={editor.isActive('italic') ? 'is-active' : ''}>기울이기
                    </button>
                    <button onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={editor.isActive('strike') ? 'is-active' : ''}>밑줄
                    </button>
                    <button onClick={() => editor.chain().focus().toggleCode().run()}
                            className={editor.isActive('code') ? 'is-active' : ''}>코드
                    </button>
                    <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            className={editor.isActive('codeBlock') ? 'is-active' : ''}>코드블럭
                    </button>
                    <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>Clear marks
                    </button>
                    <button onClick={() => editor.chain().focus().clearNodes().run()}>Clear nodes
                    </button>
                    <button onClick={() => editor.chain().focus().setParagraph().run()}
                            className={editor.isActive('paragraph') ? 'is-active' : ''}>Paragraph
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                            className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}>H1
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                            className={editor.isActive('heading', {level: 2}) ? 'is-active' : ''}>H2
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                            className={editor.isActive('heading', {level: 3}) ? 'is-active' : ''}>H3
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
                            className={editor.isActive('heading', {level: 4}) ? 'is-active' : ''}>H4
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
                            className={editor.isActive('heading', {level: 5}) ? 'is-active' : ''}>H5
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({level: 6}).run()}
                            className={editor.isActive('heading', {level: 6}) ? 'is-active' : ''}>H6
                    </button>
                    <button onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive('bulletList') ? 'is-active' : ''}>Bullet list
                    </button>
                    <button onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={editor.isActive('orderedList') ? 'is-active' : ''}>Ordered list
                    </button>
                    <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            className={editor.isActive('codeBlock') ? 'is-active' : ''}>Code block
                    </button>
                    <button onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={editor.isActive('blockquote') ? 'is-active' : ''}>Blockquote
                    </button>
                    <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>Horizontal rule
                    </button>
                    <button onClick={() => editor.chain().focus().setHardBreak().run()}>Hard break
                    </button>
                    <button onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().chain().focus().undo().run()}>Undo
                    </button>
                    <button onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().chain().focus().redo().run()}>Redo
                    </button>
                    <button onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                            className={editor.isActive('textStyle', {color: '#958DF1'}) ? 'is-active' : ''}>Purple
                    </button>
                    <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>Set horizontal rule
                    </button>
                    <button onClick={() => {
                        const input = document.createElement("input")
                        input.type = "file"
                        input.accept = "image/*"
                        input.onchange = async () => {
                            const file = input.files?.[0]
                            if (file) {
                                const formData = new FormData()
                                formData.append("file", file)

                                try {
                                    const res = await fetch("http://localhost:8080/api/upload", {
                                        method: "POST",
                                        body: formData,
                                    })

                                    const data = await res.json()
                                    const imageUrl = data.url // ex: /uploads/abc123.png

                                    editor.chain().focus().insertContent({
                                        type: 'resizableImage',
                                        attrs: {
                                            src: imageUrl,
                                            width: 'auto',
                                            height: 'auto',
                                        },
                                    }).run()
                                } catch (err) {
                                    console.error("이미지 업로드 실패:", err)
                                }
                            }
                        }
                        input.click()
                    }}>
                        이미지 업로드
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MenuBar
