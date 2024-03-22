import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { pinyin } from "pinyin-pro";
import { compileMDX } from "next-mdx-remote/rsc";
import { visit } from "unist-util-visit";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";

import { getPostWords, getTOC, isChinese, readingTime } from "@/lib/utils";

import Pre from "@/components/mdx/Pre";
import { BlockH2 } from "@/components/mdx/Block";
import Video from "@/components/mdx/Video";

export interface PostDetail {
  meta: {
    title: string;
    date: string;
    desc: string;
    slug: string;
    id: string;
  };
  content: string;
}

const rootDir = path.join(process.cwd(), "posts");

export const getPostByDir = async (dir: string) => {
  const filePath = path.join(rootDir, dir, "/index.mdx");

  const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });

  const { data } = matter(fileContent);

  const id = isChinese(dir)
    ? pinyin(dir, {
        toneType: "none",
        separator: "-",
      })
    : dir;

  return {
    meta: { ...data, slug: dir, id },
    content: fileContent,
  } as PostDetail;
};

export async function getPostList() {
  const firstDirs = fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  let dirs: string[] = [];
  firstDirs.forEach((firstDir) => {
    const oneDirs = fs
      .readdirSync(path.join(rootDir, firstDir), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => `${firstDir}/${entry.name}`);
    dirs.push(...oneDirs);
  });

  let datas = await Promise.all(
    dirs.map(async (dir) => {
      const { meta, content } = await getPostByDir(dir);
      return { meta, content };
    })
  );

  datas.sort((a, b) =>
    Date.parse(a.meta.date) < Date.parse(b.meta.date) ? 1 : -1
  );
  return datas;
}

export async function getPostBySlug(slug: string) {
  if (!slug) throw new Error("not found");
  const posts = await getPostList();
  const post = posts.find((post) => post.meta.slug);
  if (!post) {
    throw new Error("not found");
  }

  const { frontmatter, content } = await compileMDX<{
    title: string;
    date: string;
    desc: string;
  }>({
    source: post.content,
    components: { pre: Pre, h2: BlockH2, Video },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          () => (tree) => {
            visit(tree, (node) => {
              if (node?.type === "element" && node?.tagName === "pre") {
                const [codeEl] = node.children;
                if (codeEl.tagName !== "code") return;
                node.raw = codeEl.children?.[0].value;
              }
            });
          },
          // @ts-ignore
          rehypeKatex,
          [
            //@ts-ignore
            rehypePrettyCode,
            {
              theme: "one-dark-pro",
              defaultLang: {
                block: "bash",
                // inline: "plaintext",
              },
            },
          ],
          () => (tree) => {
            visit(tree, (node) => {
              if (
                node.properties &&
                "data-rehype-pretty-code-figure" in node.properties
              ) {
                for (const child of node.children) {
                  if (child.tagName === "pre") {
                    child.properties["raw"] = node.raw;
                  }
                }
              }
            });
          },
        ],
      },
    },
  });

  const words = getPostWords(post.content);
  const headings = getTOC(post.content);
  const readTime = readingTime(words);

  const postObj = {
    meta: {
      id: slug,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.desc,
      words,
      readTime,
      headings,
    },
    content,
  };

  return postObj;
}
