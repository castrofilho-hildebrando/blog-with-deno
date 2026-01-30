import { CreateArticle } from "../../application/usecases/CreateArticle.ts";
import { ListArticles } from "../../application/usecases/ListArticles.ts";
import { ArticleRepositorySqlite } from "../../infrastructure/repositories/ArticleRepositorySqlite.ts";
import { MissingArticleDataError } from "../../application/errors/MissingArticleDataError.ts";
import { GetArticleBySlug } from "../../application/usecases/GetArticleBySlug.ts";
import { ArticleNotFoundError } from "../../application/errors/ArticleNotFoundError.ts";
import { translate } from "./i18n.ts";

export class ArticleController {

    async create(request: Request): Promise<Response> {

        try {

            const body = await request.json();
            const useCase = new CreateArticle(
                new ArticleRepositorySqlite()
            );
            const article = await useCase.execute(body);

            return new Response(
                JSON.stringify(article),
                { status: 201 }
            );
        } catch (error) {

            if (error instanceof MissingArticleDataError) {
                const message = translate(
                    error.code,
                    "pt"
                );

                return new Response(
                    JSON.stringify({ error: message }),
                    { status: 400 }
                );
            }

            throw error;
        }
    }

    async getBySlug(
        slug: string,
        lang: "pt" | "en" = "pt"
    ): Promise<Response> {
        try {
            const useCase = new GetArticleBySlug(
                new ArticleRepositorySqlite()
            );

            const article = await useCase.execute(slug);

            return new Response(
                JSON.stringify(article),
                { status: 200 }
            );
        } catch (error) {
            if (error instanceof ArticleNotFoundError) {
                return new Response(
                    JSON.stringify({
                        error: translate(error.code, lang)
                    }),
                    { status: 404 }
                );
            }

            throw error;
        }
    }

    async list(): Promise<Response> {

        const useCase = new ListArticles(new ArticleRepositorySqlite());
        const articles = await useCase.execute();

        return new Response(
            JSON.stringify(articles),
            { status: 200 }
        );
    }
}
