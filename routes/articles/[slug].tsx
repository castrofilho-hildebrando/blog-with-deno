// @ts-nocheck Known tooling limitation: Fresh + Deno JSX works, but Zed disagrees.
// Build, runtime, and tests are unaffected.

import {
    Handlers,
    PageProps,
    HandlerContext
} from "$fresh/server.ts";

import { GetArticleBySlug } from "../../src/application/usecases/GetArticleBySlug.ts";
import { ArticleRepositorySqlite } from "../../src/infrastructure/repositories/ArticleRepositorySqlite.ts";
import { Article } from "../../src/domain/Article.ts";
import { ArticleNotFoundError } from "../../src/application/errors/ArticleNotFoundError.ts";
import { translate } from "../../src/interfaces/http/i18n.ts";

interface ArticlePageData {
    article: Article;
}

export const handler: Handlers<ArticlePageData> = {
    async GET(
        _req: Request,
        ctx: HandlerContext<ArticlePageData>
    ) {
        const useCase = new GetArticleBySlug(
            new ArticleRepositorySqlite()
        );

        try {
            const article = await useCase.execute(
                ctx.params.slug
            );

            return ctx.render({ article });
        } catch (error) {
            if (error instanceof ArticleNotFoundError) {
                return new Response(
                    translate("ARTICLE_NOT_FOUND", "pt"),
                    { status: 404 }
                );
            }

            throw error;
        }
    }
};

export default function ArticlePage(
    props: PageProps<ArticlePageData>
) {
    const { article } = props.data;

    return (
        <main>
            <article>
                <h1>{article.title}</h1>

                <small>
                    {new Date(
                        article.publishedAt
                    ).toLocaleDateString()}
                </small>

                <section>
                    <pre>{article.content}</pre>
                </section>
            </article>
        </main>
    );
}
