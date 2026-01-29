import { CreateArticle } from "../../application/usecases/CreateArticle.ts";
import { ListArticles } from "../../application/usecases/ListArticles.ts";
import { ArticleRepositorySqlite } from "../../infrastructure/repositories/ArticleRepositorySqlite.ts";
import { MissingArticleDataError } from "../../application/errors/MissingArticleDataError.ts";
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

    async list(): Promise<Response> {

        const useCase = new ListArticles(new ArticleRepositorySqlite());
        const articles = await useCase.execute();

        return new Response(
            JSON.stringify(articles),
            { status: 200 }
        );
    }
}
