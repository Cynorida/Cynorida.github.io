import type { PostFact } from "@/content/posts/types";

type ArticleFactsProps = {
  facts: PostFact[];
};

export function ArticleFacts({ facts }: ArticleFactsProps) {
  return (
    <div className="container">
      <dl className="article-facts">
        {facts.map((fact) => (
          <div key={fact.label} className="article-facts__item">
            <dt className="article-facts__label">{fact.label}</dt>
            <dd className="article-facts__value">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
