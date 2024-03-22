import GithubSlugger from "github-slugger";

export function isChinese(value: string) {
  return /^[\u4e00-\u9fa5]*$/.test(value);
}

export function getPostWords(content: string) {
  return content.split(" ").filter(Boolean).length;
}

export type HeadItem = {
  id: number;
  level: string;
  text: string;
  slug: string;
};

export type Headings = Array<HeadItem>;

export function getTOC(content: string) {
  const regulrExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
  const codeExp = /```[\s\S]*?```/g;
  const slugger = new GithubSlugger();
  const headings: Headings = Array.from(
    content.replace(codeExp, "").matchAll(regulrExp)
  ).map(({ groups }, index) => {
    const flag = groups?.flag;
    const content = groups?.content;
    return {
      id: index,
      level:
        flag?.length == 1
          ? "one"
          : flag?.length == 2
          ? "two"
          : flag?.length == 3
          ? "three"
          : flag?.length == 4
          ? "four"
          : "five",
      text: content || "",
      slug: content ? slugger.slug(content) : "",
    };
  });
  return headings;
}

const WORDS_PER_MINUTE = 200;
export function readingTime(wordsCount: number) {
  return Math.ceil(wordsCount / WORDS_PER_MINUTE);
}
