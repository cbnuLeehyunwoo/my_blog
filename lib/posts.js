import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'app/contents/posts');  // 경로 수정

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');  // .md 확장자 제거
    const fullPath = path.join(postsDirectory, fileName);  // 파일 경로
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,  // 메타데이터 추출 (title, date 등)
    };
  });

  // 게시물을 날짜별로 정렬 (내림차순)
  return allPostsData.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    id: fileName.replace(/\.md$/, ''),  // .md 확장자 제거 후 slug 반환
  }));
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);  // slug에 해당하는 파일 경로
  const fileContents = fs.readFileSync(fullPath, 'utf8');  // 파일 읽기

  const matterResult = matter(fileContents);  // gray-matter로 메타데이터 추출

  // remark로 마크다운 내용을 HTML로 변환
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,  // 변환된 HTML 콘텐츠
    ...matterResult.data,  // 메타데이터 (title, date 등)
  };
}
