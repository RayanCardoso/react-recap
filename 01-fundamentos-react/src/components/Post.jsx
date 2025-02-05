import {format, formatDistanceToNow} from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { Avatar } from "./Avatar"
import { Comment } from "./Comment"
import styles from "./Post.module.css"
import { useState } from "react";

//  author: {avatar_url: "", name: "", role: "" }
//  publishedAt : Date
//  content: string

export function Post({author, publishedAt, content}) {
    const [comments, setComments] = useState([
        "Post muito maneiro!"
    ]);

    const [newCommentText, setNewCommentText] = useState("")

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    });

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function handleCreateNewComent() {
        event.preventDefault();

        setComments([...comments, newCommentText])
        setNewCommentText("")
    }
    
    function handleNewCommentChange() {
        setNewCommentText(event.target.value);
    }
    
    function deleteComment(commentToDelete){
        const commentsWithoutDeletedOne = comments.filter(comment => comment != commentToDelete);

        setComments(commentsWithoutDeletedOne);
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map((line, index) => {
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
                    required
                />

                <footer>
                    <button type="submit">Publicar</button>
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