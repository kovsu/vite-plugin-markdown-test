## Vite-plugin for markdown

### core code
```ts
const markdownRE = /<vite-markdown file="(.*)"><\/vite-markdown>/g;

...

const matches = Array.from(code.matchAll(markdownRE));

...

try {
  const data = fs
    .readFileSync(resolve(dirname(id), match[1]), {
      encoding: "utf-8",
    })
    .toString();
  code = code.replaceAll(markdownRE, transformMarkdown(data));
} catch {
  code = code.replaceAll(markdownRE, "");
}
```
First, get matching code.

Then use **fs.readFileSync** get source file content, and use pkg [markdown-it](https://www.npmjs.com/package/markdown-it) to render it (make .md content to be like .html)

```ts
const transformMarkdown = (mdText: string): string => {
  return `
    <section class='article-content'>
      ${md.render(mdText)}
    </section>
  `;
};
```

In the last, use function transformMarkdown's result to replace the component in vue.



