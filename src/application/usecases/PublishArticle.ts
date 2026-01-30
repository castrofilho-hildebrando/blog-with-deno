import { Article } from "../../domain/Article.ts";
import { CreateArticle } from "./CreateArticle.ts";
import { ArticleRepository } from "../ports/ArticleRepository.ts";
import { EventPublisher } from "../ports/EventPublisher.ts";
import { ArticlePublished } from "../events/ArticlePublished.ts";

interface PublishArticleInput {
    title: string;
    content: string;
}

export class PublishArticle {
    private readonly createArticle: CreateArticle;

    constructor(
        articleRepository: ArticleRepository,
        private readonly eventPublisher: EventPublisher
    ) {
        this.createArticle = new CreateArticle(
            articleRepository
        );
    }

    async execute(
        input: PublishArticleInput
    ): Promise<Article> {
        const article =
            await this.createArticle.execute(input);

        await this.eventPublisher.publish<ArticlePublished>(
            "ArticlePublished",
            { articleId: article.id }
        );

        return article;
    }
}
