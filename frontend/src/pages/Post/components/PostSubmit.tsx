import React from "react"
import { Editor } from "@tiptap/react"
import api from "../../../api/auth"
import { useNavigate } from "react-router-dom"

type PostSubmitProps = {
    editor: Editor | null
    title: string // 제목을 추가
}

const PostSubmit = ({ editor, title, postId }: { editor: any, title: string, postId?: string }) => {
    const navigate = useNavigate()

    const handleSubmit = async () => {
        const content = editor.getHTML()
        try {
            if (postId) {
                // 수정
                await api.put(`/posts/${postId}`, { title, content })
                navigate(`/posts?id=${postId}`)
            } else {
                // 새 글 작성
                const res = await api.post("/posts", { title, content })
                navigate(`/posts?id=${res.data.id}`)
            }
        } catch (err) {
            alert("저장에 실패했습니다.")
        }
    }

    return (
        <div className="submit-container">
            <button className="submit-button" onClick={handleSubmit}>{postId ? '수정' : '저장'}</button>
        </div>
    )
}


export default PostSubmit
