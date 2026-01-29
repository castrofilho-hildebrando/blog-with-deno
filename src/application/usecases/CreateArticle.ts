import { Article } from "../../domain/Article.ts";
import { ArticleRepository } from "../ports/ArticleRepository.ts";
import { MissingArticleDataError } from "../errors/MissingArticleDataError.ts";

interface CreateArticleInput {
    title: string;
    content: string;
}

export class CreateArticle {

    constructor(
        private readonly articleRepository: ArticleRepository
    ) {}

    async execute(input: CreateArticleInput): Promise<Article> {

        if (!input.title || !input.content) {
            throw new MissingArticleDataError();
        }

        const slug = this.generateSlug(input.title);
        const article = new Article(
            crypto.randomUUID(),
            input.title,
            slug,
            input.content,
            new Date()
        );

        await this.articleRepository.save(article);
        return article;
    }

    private generateSlug(title: string): string {
        return title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-");
    }
}
