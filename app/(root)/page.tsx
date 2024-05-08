import EraseText from "@/components/shared/EraseText/index";
import { Cat } from "@/components/shared/Three/Cat";

export default function Page() {
  const text =
    "这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字这是一段测试文字";

  return (
    <article className="px-7 py-10 overflow-x-hidden max-w-[700px]">
      {/* <div className="text-4xl pb-[20px]">绝味水煮</div> */}

      {/* <EraseText text={text} /> */}
      <Cat />
    </article>
  );
}
