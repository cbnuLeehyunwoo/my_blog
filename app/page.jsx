import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import '../styles/globals.css';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="post-list">
      <h1>블로그</h1>
      <ul>
        {allPostsData.map(({ slug, date, title }) => (
          <li key={slug} className="post-item">
            <Link href={`/posts/${slug}`}>
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
