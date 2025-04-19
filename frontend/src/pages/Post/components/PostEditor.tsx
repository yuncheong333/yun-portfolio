import '../../../styles/PostEditor.css'
import {BubbleMenu, EditorContent, FloatingMenu, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Color} from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import React, {useEffect, useState} from 'react'
import MenuBar from './MenuBar'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import {all, createLowlight} from 'lowlight'

import html from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import java from 'highlight.js/lib/languages/java'
import {ResizableImage} from '../../../api/ResizableImage'
import PostSubmit from './PostSubmit'
import {useParams} from 'react-router-dom'
import api from '../../../api/auth'

const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
lowlight.register('java', java)

const extensions = [
    Color.configure({types: [TextStyle.name, ListItem.name]}),
    TextStyle,
    StarterKit.configure({codeBlock: false}),

    CodeBlockLowlight.configure({lowlight}),
    ResizableImage,
]

const PostEditor = () => {
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)

    const editor = useEditor({
        extensions,
        content: '', // 초기 content는 비워두고
    })

    useEffect(() => {
        // 수정할 게시글 ID가 있으면 서버에서 데이터 가져오기
        const fetchPost = async () => {
            try {
                const response = await api.get(`/posts/${id}`)
                const {title, content} = response.data
                console.log("콘텐츠 확인:", response.data.content);
                setTitle(title)

                // 에디터가 준비된 이후에만 content 삽입
                if (editor && !isLoaded) {
                    editor.commands.setContent(content)
                    setIsLoaded(true)
                }
            } catch (error) {
                console.error('게시글을 불러오는 데 실패했습니다.')
            }
        }

        if (id && editor) {
            fetchPost()
        }
    }, [id, editor])

    if (!editor) return null

    return (
        <div className="post-editor-container">
            <div className="first-container">
                <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="title-input"
                />
                <PostSubmit editor={editor} title={title} postId={id}/>
            </div>
            <MenuBar editor={editor}/>

            <div className="editor-area">
                <BubbleMenu
                    editor={editor}
                    tippyOptions={{ duration: 100, appendTo: "parent" }}
                    shouldShow={({ editor, state }) => {
                        const { selection } = state
                        const { from, to } = selection

                        let hasImage = false

                        state.doc.nodesBetween(from, to, (node) => {
                            if (node.type.name === 'resizableImage' || node.type.name === 'image') {
                                hasImage = true
                            }
                        })

                        return !hasImage && !selection.empty
                    }}
                >
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


                <FloatingMenu editor={editor} tippyOptions={{duration: 100, appendTo: "parent"}}>
                    <div className="floating-menu">
                        <button onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                                className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}>H1
                        </button>
                        <button onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                                className={editor.isActive('heading', {level: 2}) ? 'is-active' : ''}>H2
                        </button>
                        <button onClick={() => editor.chain().focus().toggleBulletList().run()}
                                className={editor.isActive('bulletList') ? 'is-active' : ''}>점 리스트
                        </button>
                        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}
                                className={editor.isActive('bulletList') ? 'is-active' : ''}>수평선
                        </button>
                    </div>
                </FloatingMenu>
                <EditorContent editor={editor}/>
            </div>
        </div>
    )
}

export default PostEditor
