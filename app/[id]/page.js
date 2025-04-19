import { getSortedPostsData } from '../../lib/posts'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export default async function Post({ params }) {
  const { id } = params

  // Markdown 파일을 읽어서 데이터 가져오기
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  return (
    <article>
      <h1>{matterResult.data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: matterResult.content }} />
    </article>
  )
}
