import { ApplicationError } from "./ApplicationError.ts";

export class ArticleNotFoundError extends ApplicationError {
    readonly code = "ARTICLE_NOT_FOUND";
    readonly slug: string;

    constructor(slug: string) {
        super();
        this.slug = slug;
    }
}
