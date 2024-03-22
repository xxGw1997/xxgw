import React from "react";
import { LuCalendarDays, LuHourglass } from "react-icons/lu";

import { getPostBySlug } from "@/data/post";
import { WrapperPost } from "./_comps/WrapperPost";

import "./md.css";

const page = async ({ params }: { params: { slug: string } }) => {
  const post = await getPostBySlug(params.slug);
  const readTime = post.meta.readTime;
  const headings = post.meta.headings;

  return (
    <div className="w-full h-full p-5 pt-10">
      <WrapperPost headings={headings}>
        <article className="text-[--title] mx-auto max-w-[750px]">
          <h1 className="text-4xl font-bold">{post.meta.title}</h1>
          <p className="mt-3 mb-10 ml-2 text-[14px] text-[--desc]">
            <span className="inline-flex items-center space-x-1.5 mr-6">
              <LuCalendarDays size={14} />
              <span>
                {new Date(post.meta.date).toLocaleDateString("cn", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </span>
            <span className="inline-flex items-center space-x-1.5">
              <LuHourglass size={14} />
              <span>{readTime}分钟阅读</span>
            </span>
          </p>

          <div
            className="prose prose-headings:text-[--text] prose-p:text-[--text] prose-td:text-[--text] prose-li:text-[--text] prose-code:text-[--text] prose-strong:text-[--primary]"
            id="prose"
          >
            {post.content}
          </div>
        </article>
      </WrapperPost>
    </div>
  );
};

export default page;
