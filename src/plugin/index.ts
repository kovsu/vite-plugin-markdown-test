import { Plugin } from "vite";
import { dirname, resolve } from "path";
import fs from "fs";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

const transformMarkdown = (mdText: string): string => {
  return `
    <section class='article-content'>
      ${md.render(mdText)}
    </section>
  `;
};

export default function ViteMarkdown(): Plugin {
  const markdownRE = /<vite-markdown file="(.*)"><\/vite-markdown>/g;

  return {
    name: "vite-plugin-markdown",
    enforce: "pre",
    transform(code, id) {
      const matches = Array.from(code.matchAll(markdownRE));

      if (!matches.length) return;

      for (const match of matches) {
        try {
          const data = fs
            .readFileSync(resolve(dirname(id), match[1]), {
              encoding: "utf-8",
            })
            .toString();
          code = code.replaceAll(markdownRE, transformMarkdown(data));
        } catch {
          // 如果找不到文件，就把 <vite-markdown file="./files/a.md"></vite-markdown> 给消掉
          // 这样控制台也不会警告
          code = code.replaceAll(markdownRE, "");
        }
      }

      return code;
    },
  };
}
