import { Article } from "../../../domain/Article.ts";
import { ArticleRepository } from "../../ports/ArticleRepository.ts";

export class FakeArticleRepository implements ArticleRepository {

    public savedArticles: Article[] = [];

    async save(article: Article): Promise<void> {
        this.savedArticles.push(article);
    }

    async findBySlug(_slug: string): Promise<Article | null> {
        return null;
    }

    async list(): Promise<Article[]> {
        return this.savedArticles;
    }
}
