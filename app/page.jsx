import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import '../styles/globals.css';

export default function Home() {
  // getSortedPostsData는 { id, title, date, ... } 형태의 객체 배열을 반환합니다.
  const allPostsData = getSortedPostsData();

  return (
    <div className="post-list">
      <h1>블로그</h1>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id} className="post-item">
            <Link href={`/posts/${id}`}>
              <div className="post-card">
                <h2>{title}</h2>
                <p>{date}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}