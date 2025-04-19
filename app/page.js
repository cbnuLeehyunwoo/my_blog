import Image from 'next/image'
import { getSortedPostsData } from '../lib/posts'

export default async function Home() {
  const allPostsData = getSortedPostsData()

  return (
    <main>
      <h1>블로그</h1>
      <Image 
          src="public\images\29QRYNO2QS_1.png" // public/images 폴더에 넣은 이미지 경로
          alt="쿵쿵야"
          width={1200} // 이미지의 너비 (픽셀 단위)
          height={600} // 이미지의 높이 (픽셀 단위)
        />
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
