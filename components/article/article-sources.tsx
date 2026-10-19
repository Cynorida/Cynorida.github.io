import type { PostSource } from "@/content/posts/types";

type ArticleSourcesProps = {
  sources: PostSource[];
};

export function ArticleSources({ sources }: ArticleSourcesProps) {
  return (
    <>
      <h2 id="sources">Sources</h2>
      <ol className="article-sources">
        {sources.map((source) => (
          <li key={source.href}>
            <a href={source.href} target="_blank" rel="noopener noreferrer">
              {source.label}
            </a>
          </li>
        ))}
      </ol>
    </>
  );
}
