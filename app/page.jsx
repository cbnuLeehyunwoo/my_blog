import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default async function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="container">
      <h1>블로그</h1>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small>{date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
