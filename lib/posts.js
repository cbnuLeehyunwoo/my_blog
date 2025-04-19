import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // /posts 폴더 안의 파일 이름들 가져오기
  const fileNames = fs.readdirSync(postsDirectory)
  
  const allPostsData = fileNames.map((fileName) => {
    // ".md" 확장자 제거
    const id = fileName.replace(/\.md$/, '')

    // 파일 전체 경로
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 메타데이터와 본문 파싱
    const matterResult = matter(fileContents)

    // 데이터 반환
    return {
      id,
      ...matterResult.data
    }
  })

  // 날짜 순으로 정렬
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}
