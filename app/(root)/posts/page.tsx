import { getPostList } from "@/data/post";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <BlogList />
    </>
  );
}

async function BlogList() {
  const posts = await getPostList();
  for (let index = 0; index < 5; index++) {
    posts.push(...posts);
  }
  return (
    <div className="mx-10 md:mx-auto max-w-xl mt-10">
      <div className="flex flex-col items-center">
        {posts.map(({ meta }, index) => (
          <Link
            href={`/posts/${meta.slug}`}
            key={meta.id + index}
            className="w-full"
          >
            <article className="mb-8">
              <span className="mb-1 text-xl font-bold text-[--title] hover:text-[--primary]">
                {meta.title}
              </span>
              <p className="mb-2 text-xs text-[--text]">
                {new Date(meta.date).toLocaleDateString("cn", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p>{meta.desc}</p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
