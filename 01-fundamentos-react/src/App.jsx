import { Header } from "./components/Header"
import "./global.css"
import styles from "./App.module.css"
import { Sidebar } from "./components/SideBar"
import { Post } from "./components/Post"

//  author: {avatarUrl: "", name: "", role: "" }
//  publishedAt : Date
//  content: Array string

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/RobertoPacheco122.png",
      name: "Roberto Pacheco",
      role: "Full PEC Developer"
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋"},
      { type: "paragraph", content: "Desde o ano passado que não programo haha 🚀"},
      { type: "link", content: "Robertão dos tecidos"}
    ],
    publishedAt: new Date("2024-01-01 00:00:00")
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/RafaBalieiro.png",
      name: "Rafael Brasileiro",
      role: "Developer 2.0 mais brabo"
    },
    content: [
      { type: "paragraph", content: "Oi gente!"},
      { type: "paragraph", content: "Estou trabalhando muito para conseguir fechar um projeto do VEL 2.0, espero que me faça ganhar muita experiência!"},
      { type: "link", content: "Rafael Baladeiro"}
    ],
    publishedAt: new Date("2025-01-02 21:00:00")
  }
]

export function App() {
  return (
    <>
      <Header />
      
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post, index) => (
            <Post
              key={index}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          ))}
        </main>
      </div>
    </>
  )
}
