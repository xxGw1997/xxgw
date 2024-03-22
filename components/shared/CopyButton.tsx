"use client";
import React, { useState } from "react";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { motion } from "framer-motion";

const CopyButton = ({ text }: { text: string | undefined }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    // 3秒后按钮内容复原
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };
  return (
    <button disabled={isCopied} onClick={copy} className="inline-block">
      {isCopied ? (
        <motion.div>
          <LuCopyCheck color="#32cd1d" size={22} />
        </motion.div>
      ) : (
        <motion.div>
          <LuCopy size={22} />
        </motion.div>
      )}
    </button>
  );
};

export default CopyButton;
