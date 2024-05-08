"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useEventListener, useInViewport, useMemoizedFn } from "ahooks";
import type { Headings } from "@/lib/utils";
import { HEADER_HEIGHT } from "@/constant";

export const WrapperPost = ({
  headings,
  children,
}: {
  headings: Headings;
  children: React.ReactNode;
}) => {
  const [h_tags, setHTags] = useState<HTMLElement[]>([]);
  const [links, setLinks] = useState<HTMLLinkElement[]>([]);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tags = [
      ...(document.querySelectorAll(
        "#prose h1, #prose h2, #prose h3, #prose h4, #prose h5"
      ) as NodeListOf<HTMLElement>),
    ];
    const links = [
      ...(document.querySelectorAll(
        ".js-toc a"
      ) as NodeListOf<HTMLLinkElement>),
    ];
    setLinks(links);
    setHTags(tags);
  }, []);

  const callback = useMemoizedFn((entry) => {
    let href = `${entry.target.getAttribute("id")}`;
    let link = links.find((l) => decodeURI(l.href.split("#")[1]) === href);
    if (link) {
      if (entry.isIntersecting) {
        link.classList.add("is-visible");
      } else {
        link.classList.remove("is-visible");
      }
    }
    links.forEach((link) => {
      link.classList.remove("is-active");
    });
    const firstVisibleLink = document.querySelector(".js-toc .is-visible");
    firstVisibleLink && firstVisibleLink.classList.add("is-active");
  });

  useInViewport(h_tags, {
    callback,
    rootMargin: `-${HEADER_HEIGHT - 1}px 0% 0% 0%`,
    threshold: 1,
  });

  const navigate = useCallback(() => {
    if (location.hash) {
      const anchor = document.querySelector(
        decodeURIComponent(location.hash)
      ) as HTMLElement;
      window.scrollTo({
        top: anchor.offsetTop - HEADER_HEIGHT,
        behavior: "smooth",
      });
    }
  }, []);

  const handleAnchors = useCallback(
    (event: MouseEvent & { target: HTMLElement }) => {
      const link = event.target.closest("a");

      if (
        !event.defaultPrevented &&
        link &&
        event.button === 0 &&
        link.target !== "_blank" &&
        link.rel !== "external" &&
        !link.download &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey
      ) {
        const url = new URL(link.href);
        if (url.origin !== window.location.origin) return;

        event.preventDefault();
        const { pathname, hash } = url;
        if (hash && (!pathname || pathname === location.pathname)) {
          window.history.replaceState({}, "", hash);
          navigate();
        }
      }
    },
    []
  );

  useEventListener("hashchange", navigate);
  useEventListener("click", handleAnchors, {
    target: content.current,
    passive: false,
  });

  return (
    <div ref={content}>
      {/* TOC */}
      <Toc headings={headings} />
      {children}
    </div>
  );
};

export const Toc = ({ headings }: { headings: Headings }) => {
  return (
    <div className="overflow-auto fixed left-[50px] top-[70px] lg:block hidden">
      <ul className="text-sm mt-4 js-toc">
        {headings.length != 0 ? (
          headings.map(
            (heading: { slug: string; level: string; text: string }) => {
              return (
                <li
                  key={`#${heading.slug}`}
                  className="flex pb-1 hover:text-[--primary]"
                >
                  <a
                    data-level={heading.level}
                    className="data-[level=one]:pl-0 data-[level=one]:font-semibold
                      data-[level=two]:pl-[10px]  data-[level=two]:font-medium
                      data-[level=three]:pl-[20px]
                      data-[level=four]:pl-[30px]
                      data-[level=five]:pl-[40px]
                      flex-1 inline-block cursor-pointer"
                    // 这里给a标签加的id值
                    href={`#${heading.slug}`}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            }
          )
        ) : (
          <div className="font-semibold">暂时没有标题</div>
        )}
      </ul>
    </div>
  );
};
