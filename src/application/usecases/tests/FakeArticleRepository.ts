import { Article } from "../../../domain/Article.ts";
import { ArticleRepository } from "../../ports/ArticleRepository.ts";

export class FakeArticleRepository
    implements ArticleRepository {

    public articles: Article[] = [];

    async save(article: Article): Promise<void> {
        this.articles.push(article);
    }

    async findById(id: string): Promise<Article | null> {
        return (
            this.articles.find(
                (a) => a.id === id
            ) ?? null
        );
    }

    async findBySlug(slug: string): Promise<Article | null> {
        return (
            this.articles.find(
                (a) => a.slug === slug
            ) ?? null
        );
    }

    async list(): Promise<Article[]> {
        return this.articles;
    }
}
