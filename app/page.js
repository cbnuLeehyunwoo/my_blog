import { getSortedPostsData } from '../lib/posts'

export default async function Home() {
  const allPostsData = getSortedPostsData()

  return (
    <main>
      <h1>블로그</h1>
      <ul>
        {allPostsData.map(({ id, title, date }) => (
          <li key={id}>
            <strong>{title}</strong> <br />
            <small>{date}</small>
          </li>
        ))}
      </ul>
    </main>
  )
}
