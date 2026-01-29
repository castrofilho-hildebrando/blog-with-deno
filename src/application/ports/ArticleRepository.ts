// src/application/ports/ArticleRepository.ts
import { Article } from "../../domain/Article.ts";

export interface ArticleRepository {
    save(article: Article): Promise<void>;
    findBySlug(slug: string): Promise<Article | null>;
    list(): Promise<Article[]>;
}
