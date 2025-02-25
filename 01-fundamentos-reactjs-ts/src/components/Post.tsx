import {format, formatDistanceToNow} from "date-fns";
import {ptBR} from "date-fns/locale/pt-BR";

import { Avatar } from "./Avatar"
import { Comment } from "./Comment"
import styles from "./Post.module.css"
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

//  author: {avatar_url: "", name: "", role: "" }
//  publishedAt : Date
//  content: string

interface IAuthor {
    name: string;
    role: string;
    avatarUrl: string;
}

interface IContent {
    type: 'paragraph' | 'link',
    content: string;
}

export interface IPost {
    id: number;
    author: IAuthor;
    publishedAt: Date;
    content: IContent[];
}

interface IPostProps {
    post: IPost;
}

export function Post({post} : IPostProps) {
    const [comments, setComments] = useState([
        "Post muito maneiro!"
    ]);

    const [newCommentText, setNewCommentText] = useState("")

    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    });

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function handleCreateNewComent(event: FormEvent) {
        event.preventDefault();

        setComments([...comments, newCommentText])
        setNewCommentText("")
    }
    
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("");
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity("Este campo é obrigatório!");
    }
    
    function deleteComment(commentToDelete: string){
        const commentsWithoutDeletedOne = comments.filter(comment => comment != commentToDelete);

        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length == 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {post.content.map((line, index) => {
                    if(line.type == "paragraph") {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type == "link") {
                        return <a key={line.content} href="">{line.content}</a>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComent} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    value={newCommentText}
                    placeholder="Deixe um comentário"
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button 
                        type="submit"
                        disabled={isNewCommentEmpty}
                    >
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map((comment) => {
                    return (
                        <Comment 
                            key={comment} 
                            content={comment} 
                            onDeleteComment={deleteComment} 
                        />
                    )
                })}
                
            </div>
        </article>
    )
}