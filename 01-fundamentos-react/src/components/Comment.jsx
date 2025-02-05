import { ThumbsUp, Trash } from "phosphor-react"
import styles from "./Comment.module.css"
import { Avatar } from "./Avatar"

export function Comment ({content, onDeleteComment}) {
    function handleDeleteComment() {
        onDeleteComment(content)
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/RayanCardoso.png" />            

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Rayan Cardoso</strong>
                            <time title="02 de Janeiro às 08:00hrs" dateTime="2025-01-01 00:00">
                                Cerca de 1 mês atrás
                            </time>
                        </div>

                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <Trash size={20} />
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button>
                        <ThumbsUp />
                        Aplaudir <span>20</span>
                    </button>
                </footer>
            </div>
        </div>
    )
} 