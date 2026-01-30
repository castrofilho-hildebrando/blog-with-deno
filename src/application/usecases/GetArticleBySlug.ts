import { Article } from "../../domain/Article.ts";
import { ArticleRepository } from "../ports/ArticleRepository.ts";
import { ArticleNotFoundError } from "../errors/ArticleNotFoundError.ts";

export class GetArticleBySlug {
    constructor(
        private readonly articleRepository: ArticleRepository
    ) {}

    async execute(slug: string): Promise<Article> {
        const article =
            await this.articleRepository.findBySlug(slug);

        if (!article) {
            throw new ArticleNotFoundError(slug);
        }

        return article;
    }
}
