// @ts-nocheck Known tooling limitation: Fresh + Deno JSX works, but Zed disagrees.
// Build, runtime, and tests are unaffected.

import { Handlers, PageProps, HandlerContext } from "$fresh/server.ts";

import { ListArticles } from "../src/application/usecases/ListArticles.ts";
import { ArticleRepositorySqlite } from "../src/infrastructure/repositories/ArticleRepositorySqlite.ts";
import { Article } from "../src/domain/Article.ts";

interface HomeData {
    articles: Article[];
}

export const handler: Handlers<HomeData> = {
    async GET(_req: Request, ctx: HandlerContext<HomeData>) {
        const useCase = new ListArticles(
            new ArticleRepositorySqlite()
        );

        const articles = await useCase.execute();

        return ctx.render({ articles });
    }
};

export default function Home(
    props: PageProps<HomeData>
) {
    return (
        <main>
            <h1>Blog about Architecture</h1>

            <ul>
                {props.data.articles.map((article) => (
                    <li key={article.id}>
                        <strong>{article.title}</strong>
                    </li>
                ))}
            </ul>
        </main>
    );
}
