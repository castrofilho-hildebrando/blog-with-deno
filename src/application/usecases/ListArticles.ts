import { Article } from "../../domain/Article.ts";
import { ArticleRepository } from "../ports/ArticleRepository.ts";

export class ListArticles {
    constructor(
        private readonly articleRepository: ArticleRepository
    ) {}

    async execute(): Promise<Article[]> {
        return this.articleRepository.list();
    }
}
