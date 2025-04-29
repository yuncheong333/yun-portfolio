import React from 'react'
import {Editor} from '@tiptap/react'
import {
    Bold,
    Italic,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Minus,
    ImagePlus,
    Code2, Undo2, Redo2,
    TextQuote, Heading4,
} from 'lucide-react'
import api from "../../../api/auth";


interface MenuBarProps {
    editor: Editor
}


const MenuBar: React.FC<MenuBarProps> = ({editor}) => {
    if (!editor) return null

    return (
        <div className="post-editor-wrapper">
            <div className="control-group">
                <div className="button-group">
                    <button onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().chain().focus().undo().run()} title="실행 취소">
                        <Undo2 size={18}/>
                    </button>
                    <button onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().chain().focus().redo().run()} title="다시 실행">
                        <Redo2 size={18}/>
                    </button>
                    <button onClick={() => editor.chain().focus().toggleBold().run()}
                            className={editor.isActive('bold') ? 'is-active' : ''}
                            title="굵게">
                        <Bold size={18}/>
                    </button>
                    <button onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={editor.isActive('italic') ? 'is-active' : ''}
                            title="기울이기">
                        <Italic size={18}/>
                    </button>
                    <button onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={editor.isActive('strike') ? 'is-active' : ''}
                            title="취소선">
                        <Strikethrough size={18}/>
                    </button>
                    <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            className={editor.isActive('codeBlock') ? 'is-active' : ''}
                            title="코드 블럭">
                        <Code2 size={18}/>
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                            className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''} title="제목 1">
                        <Heading1 size={18}/>
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                            className={editor.isActive('heading', {level: 2}) ? 'is-active' : ''} title="제목 2">
                        <Heading2 size={18}/>
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                            className={editor.isActive('heading', {level: 3}) ? 'is-active' : ''} title="제목 3">
                        <Heading3 size={18}/>
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
                            className={editor.isActive('heading', {level: 4}) ? 'is-active' : ''} title="제목 4">
                        <Heading4 size={18}/>
                    </button>
                    <button onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive('bulletList') ? 'is-active' : ''} title="점 리스트">
                        <List size={18}/>
                    </button>
                    <button onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={editor.isActive('orderedList') ? 'is-active' : ''} title="순서 리스트">
                        <ListOrdered size={18}/>
                    </button>
                    <button onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={editor.isActive('blockquote') ? 'is-active' : ''} title="인용구">
                        <TextQuote size={18}/>
                    </button>
                    <button onClick={() => editor.chain().focus().setHorizontalRule().run()} title="수평선">
                        <Minus size={18}/>
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
                                formData.append("upload_preset", "yun-port")

                                try {
                                    const res = await api.post('https://api.cloudinary.com/v1_1/Untitled/image/upload', formData, {
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                        },
                                    })


                                    const imageUrl = res.data.secure_url;

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
                    }} title="이미지 추가">
                        <ImagePlus size={18}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MenuBar
