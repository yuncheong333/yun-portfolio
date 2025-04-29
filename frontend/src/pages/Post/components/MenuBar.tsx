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
import axios from "axios";


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
                                const formData = new FormData();
                                formData.append("file", file);
                                formData.append("upload_preset", "yun_port");

                                // 로그: 업로드할 파일 정보 출력
                                console.log("[업로드 요청] 선택한 파일:", {
                                    name: file.name,
                                    type: file.type,
                                    size: file.size,
                                });

                                // 로그: FormData 항목 전체 확인
                                for (const [key, value] of formData.entries()) {
                                    console.log(`[FormData] ${key}:`, value);
                                }

                                try {
                                    const res = await api.post(`${process.env.REACT_APP_API_URL}/api/upload`, formData, {
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                        },
                                    });

                                    console.log("[응답 수신] 업로드 성공:", res.data);

                                    const imageUrl = res.data.secure_url;
                                    if (!imageUrl) {
                                        console.warn("⚠️ 응답에는 secure_url이 포함되어 있지 않습니다:", res.data);
                                    }

                                    editor.chain().focus().insertContent({
                                        type: 'resizableImage',
                                        attrs: {
                                            src: imageUrl,
                                            width: 'auto',
                                            height: 'auto',
                                        },
                                    }).run();

                                    console.log("[에디터 삽입] 이미지가 성공적으로 에디터에 삽입되었습니다.");

                                } catch (err: unknown) {
                                    console.error("❌ 이미지 업로드 실패:");

                                    if (axios.isAxiosError(err)) {
                                        if (err.response) {
                                            console.error("응답 상태코드:", err.response.status);
                                            console.error("응답 본문:", err.response.data);
                                        } else if (err.request) {
                                            console.error("요청은 보냈지만 응답이 없습니다.", err.request);
                                        } else {
                                            console.error("설정 중 에러 발생:", err.message);
                                        }
                                    } else {
                                        console.error("Axios 에러가 아닌 다른 예외:", err);
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
