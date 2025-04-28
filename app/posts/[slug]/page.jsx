import { getPostData, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  console.log("Posts: ", posts);

  return posts.map((post) => ({
    params: {  // ← params 키 추가
      slug: post.id
    }
  }));
}

export async function generateMetadata({ params }) {
  console.log("Received slug:", params.slug); // 로그 추가

  const post = await getPostData(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.date}</div>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
